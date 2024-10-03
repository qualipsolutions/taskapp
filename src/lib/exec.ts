// pages/api/execute.js

import { exec } from 'child_process';

export function run(command: string) {
  const response: {
    status: number;
    data: string | null;
    error: string | null;
  } = {
    status: 200,
    data: null,
    error: null,
  };
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      response.status = 500;
      response.error = error.message;
      return response;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      response.status = 500;
      response.error = stderr;
      return response;
    }
    response.status = 200;
    response.data = stdout;
    console.log(response);
    return response;
  });
}
