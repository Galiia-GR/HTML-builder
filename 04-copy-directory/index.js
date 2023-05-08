const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;


const {stdout,exit} = process;

const direct = path.join(__dirname, 'files');
const newDirect=path.join(__dirname, 'files-copy');


fsPromises.access(newDirect). then(function() {
  stdout.write(`\n такая папка уже создана ${newDirect}`);
  exit();
}).catch(function() {
  stdout.write('Создаю папку...\n');
});


fsPromises.mkdir(newDirect, {recursive:true}). then(function() {

  fs.readdir(direct, (err, files)=> {
    files.forEach((el) => {
      if (err) throw err;

      fs.copyFile(
        path.join(direct, el),
        path.join(newDirect,el),
        (err) => {
          if (err) throw err;
          console.log('Файл скопирован');
        }
      );
    });
  });
}).catch(function() {
  console.log('Не удалось скопирвать файлы');
});