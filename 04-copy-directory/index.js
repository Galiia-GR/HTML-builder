const fs = require('fs');
const path = require('path');

const {stdout,exit} = process;

const direct = path.join(__dirname, 'files');
const newDirect=path.join(__dirname, 'files-copy');


function makeFolder() {
  fs.mkdir((newDirect),{ recursive: false }, (err) => {
    if (err) {
      throw err;

    }
  });
}

fs.access(newDirect, (err) => {
  if (err) {
    stdout.write(`\n такая папка уже создана ${newDirect}`);
    throw err;
  }
  else {
    makeFolder();
  }
});


fs.readdir(direct, (err, list)=>{
  if (err) {
    throw err;
  }
  list.forEach((el) => {
    fs.copyFile((direct, el), (newDirect, el)), (err) => {
      if (err) {
        throw err;
      }
    };
  });
});
