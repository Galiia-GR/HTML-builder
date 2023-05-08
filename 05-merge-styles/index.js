const fs = require('fs');
const path = require('path');

const finalBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const dirStyles = path.join(__dirname, 'styles');

function collectFile() {
  fs.readdir(dirStyles, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.stat(path.join(__dirname, 'styles', file), (err, el) => {
        if (err) throw err;

        const extend = path.basename(file, '').split('.')[1];

        if(el.isFile() && extend === 'css') {
          const fileIn = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
          fileIn.on('data', data => {
            fs.appendFile(finalBundle, data, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    });
  });
}


collectFile();