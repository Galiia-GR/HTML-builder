const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = process;

fs.writeFile(
  path.join(__dirname, 'hello.txt'),
  'Hello ', () => {
    stdout.write('What is your name?\n');

    stdin.on('data' , data => {
      fs.appendFile(path.join(__dirname, 'hello.txt'), data.toString(),

        (err) => {
          if (err) throw new Error ('opps, something went wrong');
        }
      );
    });
  });

const readingFile = fs.createReadStream(path.join(__dirname, 'hello.txt'), 'utf-8');

process.on (process.on('SIGINT', () => {
  readingFile.on('data', data => {
    stdout.write(data),

    (err) => {
      if (err) throw new Error ('opps, something went wrong');
    };
  });
  stdout.write('Goodbye');
  exit();
})
);