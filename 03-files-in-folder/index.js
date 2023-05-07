const fs = require('fs');
const path = require('path');
const {stdout,exit} = process;
const folderS = 'secret-folder';

fs.readdir(path.join(__dirname, folderS), (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((file) => {
    fs.stat(path.join(__dirname, folderS, file), (err, el)=>{
      if (err){
        throw err;
      }
      if(el.isFile()) {
        const name = path.basename(file, '').split('.')[0];
        const extend = path.basename(file, '').split('.')[1];
        const size = el.size/1024;
        stdout.write(`${name} - ${extend} - ${size}kb`);
      }
    });
  });
}
);

process.on('SIGINT', () => {
  exit();
});