import { NextResponse } from 'next/server';
import { run } from 'shell-commands';

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
  const body = await request.json();
  const command = body.command;
  const response = run(command).then((res) => {
    console.log(res);
    return res;
  });
  return NextResponse.json({ success: true, response });
}
