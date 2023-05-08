const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const finalBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const dirStyles = path.join(__dirname, 'styles');

function collectFile() {

  fsPromises.readdir(dirStyles.forEach((file) => {

    const streamOut = fs.createReadStream((dirStyles, 'utf-8');
    const streamIn = fs.createWriteStream((finalBundle, 'utf-8');

    if(file.isFile() && file.name.split('.')[1]==='css') {
      stream.on('data', (chunck)=> fs.createWriteStream(finalBundle,'utf-8');
      console.log('стрим работает');
    }
  })
  );
}

collectFile();