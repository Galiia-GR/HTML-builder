const fs = require('fs');
const path = require('path');

const finalBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const dirStyles = path.join(__dirname, 'styles');

function collectFile() {
  fs.readdir(dirStyles, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.stat(path.join(__dirname, 'styles', file), (err, el)=>{
        if (err) throw err;

        const extend = path.basename(file, '').split('.')[1];

        console.log(extend);
        if(el.isFile() && extend === 'css') {
console.log(el);
          };
      });
    });
  });
}


collectFile();