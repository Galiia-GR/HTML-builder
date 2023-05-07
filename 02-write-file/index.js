const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = process;
const readingFile = fs.createReadStream(path.join(__dirname, 'hello.txt'), 'utf-8');


fs.writeFile(
  path.join(__dirname, 'hello.txt'),
  'Hello ', () => {
    stdout.write('What is your name?\n');

    stdin.on('data' , data => {
      fs.appendFile(path.join(__dirname, 'hello.txt'), data.toString(),

        (err) => {
          if (err) throw err;
        }
      );
    });
  });

stdin.on('data', data =>{
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    readingFile.on('data', data => {
      stdout.write(data);
    });
  }
});

process.on('exit', () => {
  stdout.write('Goodbye!');
});

process.on('SIGINT', () => {
  exit();
});
