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


//////copyAssets
const dirBundle = path.join(__dirname, 'project-dist', 'assets');
const dirAssets = path.join(__dirname, 'assets');


const copyDir = (dirAssets, dirBundle) => {
  fs.mkdir(dirBundle, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(dirAssets, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      let oldDirFile = path.join(dirAssets, file.name);
      let newDirFile = path.join(dirBundle, file.name);

      fs.stat(oldDirFile, (err, item) => {
        if (err) throw err;

        if (item.isDirectory()) {
          copyDir(oldDirFile, newDirFile);
        }
        if (item.isFile()) {
          fs.copyFile(oldDirFile, newDirFile, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
};

copyDir(dirAssets, dirBundle);




////work with html
const streamOut = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8'
);
streamOut.on('data', (data) => {
  template = data;
});


const compDirFile = path.join(__dirname, 'components');

fs.readdir(compDirFile, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'components', file), (err, el) => {
      if (err) throw err;

      if(el.isFile() && path.basename(file, '').split('.')[1] === 'html'){
        let tag = path.basename(file, '').split('.')[0];
        let name = path.basename(file, '');
        console.log(tag, name);

        fs.readFile(
          path.join(__dirname, 'components', name),
          'utf-8',
          (err, files) => {
            if (err) throw err;
            template = template.replace(`{{${tag}}}`, `${files}`);
            const streamIn = fs.createWriteStream(
              path.join(__dirname, 'project-dist', 'index.html')
            );
            streamIn.write(template);
            streamIn.close();
          }
        );
      }
    });
  });
});

