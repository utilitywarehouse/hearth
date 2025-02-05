const { exec } = require('child_process');

exec(`cd ${__dirname} && npx turbo build`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
