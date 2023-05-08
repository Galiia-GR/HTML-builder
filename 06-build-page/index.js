const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const {stdout} = process;

const newDirect=path.join(__dirname, 'project-dist');

fsPromises.access(newDirect). then(function() {
  stdout.write(`Данная папка уже создана ${newDirect} \n`);
  stdout.write('Перезаписываю файлы...\n');
  buildFile();
}).catch(function() {
  stdout.write('Создаю папку...\n');
  buildFile();
});


////import css
const dirCssBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const dirStyle = path.join(__dirname, 'styles');

function buildFile() {
  fsPromises.mkdir(newDirect, {recursive:true}, (err) => {
    if (err) throw err;
  });


  fs.readdir(dirStyle, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.stat(path.join(__dirname, 'styles', file), (err, el) => {
        if (err) throw err;

        const extend = path.basename(file, '').split('.')[1];

        if(el.isFile() && extend === 'css') {
          const fileIn = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
          fileIn.on('data', data => {
            fs.appendFile(dirCssBundle, data, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    });
  });



}