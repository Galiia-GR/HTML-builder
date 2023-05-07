const fs = require('fs');
const path = require('path');
const {stdout,exit} = process;

const direct = path.join(__dirname, 'files');
const newDirect=path.join(__dirname, 'files-copy');

function copy() {
  if (newDirect) {
    stdout.write(`такая папка уже создана ${newDirect}`);
  }
  fs.mkdir(path.join(newDirect), (err)=> {
    if (err) {
      throw err;
    }
  });
 exit();
}

copy();