// if (Math.random() >0.5) {
//   while (true){
//   }
//   } else {
//     console.log("the end");
//     process.exit()
// }

// const path = require ('path');


// console.log (path.join("first", "second"));

// path.join(__dirname, "first", "second")); ////склеить участки пути
// console.log (path.join(__dirname, ",..", "..")); /// подняться на уровни вверх
// console.log (path.resolve("./first", './second')); ///указывает абслолютный путь

// const fs= require('fs');
// const path = require ('path');

// fs.mkdirSync(path.resolve(__dirname, "dir", "dir2", "dir3"),{recursive: true})


// fs.mkdir(path.resolve(__dirname, 'dir'), (err) =>{ ////создание папки
//   if (err){
//     console.log(err);
//     return;
//   }
//   console.log('папки есть');
// });



// fs.rmdir(path.resolve(__dirname, 'dir'), (err) =>{ /////удаление папки
//   if (err){
//     console.log('папки нет');
//     throw err;
//   }
// });