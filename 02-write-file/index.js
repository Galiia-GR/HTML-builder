const fs = require('fs');
const readline = require('readline');
const {stdin, stdout, exit} = process;

fs.writeFile(
  path.join(__dirname, 'hello.txt'),
  'Hello ',
  (err) => {
      if (err) throw err;
  }
);

stdout.write('What is your name?\n');
stdin.on('data' , data => {
  stdout.write(data);
  process.exit();
});