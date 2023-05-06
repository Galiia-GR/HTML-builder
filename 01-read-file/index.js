const fs = require('fs');
const path = require('path');
const {stdout} = process;

const readingFile = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

readingFile.on('data', data => {
  stdout.write(data);
}
);
readingFile.on('error', (error) => {
  console.log ('opps, something went wrong', error);
}
);