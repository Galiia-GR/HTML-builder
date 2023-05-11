const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;


const {stdout} = process;

const direct = path.join(__dirname, 'files');
const newDirect=path.join(__dirname, 'files-copy');


fsPromises.access(newDirect). then(function() {
  stdout.write ('Перезаписываю файлы...\n');
  fs.rm(newDirect, { recursive: true }, (err) => {
    if (err) console.log ('Перезаписываю файлы...\n');
    copyFile();});
}).catch(function() {
  stdout.write('Создаю папку...\n');
  copyFile();
});

function copyFile() {
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
}
