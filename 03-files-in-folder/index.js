const fs = require('fs');
const path = require('path');
const folder= 'secret-folder';

fs.readdir(path.join(__dirname, folder), (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((el) => {
    fs.stat(path.join(__dirname, folder, el), (err, el)=>{
      if (err){
        throw err;
      }
      if(el.isFile()) {
      }
    });
  });
}
);