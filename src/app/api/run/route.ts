import { NextResponse } from 'next/server';
// import { run } from 'shell-commands';
import run from 'shell-exec';

// Store for running commands with metadata
interface TaskMetadata {
  startedAt: number;
  command: string;
}

const runningCommands = new Map<string, TaskMetadata>();

// Default timeout: 5 minutes
const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const task = searchParams.get('task');

  if (task) {
    // Check specific task status
    const taskInfo = runningCommands.get(task);
    if (taskInfo) {
      return NextResponse.json({
        running: true,
        task,
        startedAt: taskInfo.startedAt,
        command: taskInfo.command,
        runningSince: Date.now() - taskInfo.startedAt,
      });
    }
    return NextResponse.json({ running: false, task });
  }

  // List all running tasks
  const tasks = Array.from(runningCommands.entries()).map(([name, info]) => ({
    task: name,
    command: info.command,
    startedAt: info.startedAt,
    runningSince: Date.now() - info.startedAt,
  }));

  return NextResponse.json({ runningTasks: tasks, count: tasks.length });
}

/**
 * Run a task:
 * {
 *   "task": "task_name",
 *   "command": "command_to_run",
 *   "timeout": 300000,  // optional, milliseconds (default: 5 minutes)
 *   "force": false      // optional, force execution even if task is running
 * }
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { command, task, timeout = DEFAULT_TIMEOUT_MS, force = false } = body;

    // Validate required fields
    if (!command) {
      return NextResponse.json(
        { success: false, error: 'Command is required' },
        { status: 400 }
      );
    }

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task name is required' },
        { status: 400 }
      );
    }

    // Check if the task is already running
    const existingTask = runningCommands.get(task);
    if (existingTask && !force) {
      const runningSince = Date.now() - existingTask.startedAt;
      // Return success to indicate the task is being handled (idempotent behavior)
      return NextResponse.json({
        success: true,
        message: 'Task is already running',
        alreadyRunning: true,
        task,
        runningSince,
        command: existingTask.command,
      });
    }

    // Force mode: clear existing task
    if (force && existingTask) {
      runningCommands.delete(task);
      console.log(`Force mode: Cleared existing task "${task}"`);
    }

    // Mark the task as running
    runningCommands.set(task, {
      startedAt: Date.now(),
      command,
    });

    // Setup timeout to prevent memory leaks
    const timeoutHandle = setTimeout(() => {
      if (runningCommands.has(task)) {
        console.warn(`Task "${task}" exceeded timeout of ${timeout}ms, removing from tracking`);
        runningCommands.delete(task);
      }
    }, timeout);

    // Start the command execution without waiting for it to complete
    run(command)
      .then((res) => {
        console.log(`Command completed for task "${task}":`, res);
        clearTimeout(timeoutHandle);
        runningCommands.delete(task);
      })
      .catch((err) => {
        console.error(`Command failed for task "${task}":`, err);
        clearTimeout(timeoutHandle);
        runningCommands.delete(task);
      });

    // Immediately return a response
    return NextResponse.json({
      success: true,
      message: 'Command execution started',
      task,
      command,
      timeout,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

/**
 * Cancel a running task
 * DELETE /api/run?task=task_name
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const task = searchParams.get('task');

  if (!task) {
    return NextResponse.json(
      { success: false, error: 'Task name is required' },
      { status: 400 }
    );
  }

  const existed = runningCommands.has(task);
  runningCommands.delete(task);

  return NextResponse.json({
    success: true,
    message: existed
      ? `Task "${task}" removed from tracking`
      : `Task "${task}" was not running`,
    existed,
  });
}
