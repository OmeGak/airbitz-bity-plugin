const runAll = require('npm-run-all');

const args = process.argv.slice(2);

const commands = [
  'dist:clean',
  `dist:compile -- ${args.join(' ')}`,
  'dist:clean-after-compile'
];

const opts = {
  printName: true,
  stdin: process.stdin,
  stdout: process.stdout
};

runAll(commands, opts)
  .then(() => {
    console.log('DONE');
  })
  .catch((e) => {
    throw e;
  });
