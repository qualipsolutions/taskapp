import { NextResponse } from 'next/server';
// import { run } from 'shell-commands';
import run from 'shell-exec';

// Store for running commands
const runningCommands = new Map<string, boolean>();

export async function GET() {
  // Handle GET request
  return NextResponse.json({ message: 'GET request received' });
}

/**
 * Run a task:
 * {
 *   "task": "task_name",
 *   "command": "command_to_run",
 * }
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { command, task } = body;

    if (!command && !task) {
      return NextResponse.json(
        { success: false, error: 'Command or task is required' },
        { status: 400 }
      );
    }

    // Check if the task is already running
    if (runningCommands.get(task)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Task or command is already running',
        },
        { status: 409 }
      );
    }

    // Mark the task as running
    runningCommands.set(task, true);

    // Start the command execution without waiting for it to complete
    run(command)
      .then((res) => {
        console.log('Command completed:', res);
        runningCommands.delete(task); // Remove task from running list
      })
      .catch((err) => {
        console.error('Command failed:', err);
        runningCommands.delete(task); // Remove task from running list even if it fails
      });

    // Immediately return a response
    return NextResponse.json({
      success: true,
      message: 'Command execution started',
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred' },
      { status: 500 }
    );
  }
}
