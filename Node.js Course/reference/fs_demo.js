const fs = require('fs');
const path = require('path');

// Create a folder, is asyncrhonus, having a callback
// fs.mkdir(path.join(__dirname,'test'), {}, err => {
   // if (err)throw err;
   // console.log('Folder created...');
// });

// Create and write to file
// fs.writeFile( // Thiss overwrites the file
//     path.join(__dirname,'/test','hello.txt'), 'Hello World!', err => {
//         if (err)throw err;
//         console.log('File written to...');

//         // We put it in the callback
//         fs.appendFile(
//             path.join(__dirname, '/test', 'hello.txt'),
//             ' I love Node.js',
//             err => {
//                 if (err) throw err;
//                 console.log('File written to ...')
//             }
//         )
//     }
// );

// Read file
fs.readFile(path.join(__dirname,'test','hello.txt'), 'utf8', (err,data) => {
   if (err)throw err;
   console.log(data);
});

// Rename file
fs.rename(path.join(__dirname,'test','hello.txt'), path.join(__dirname,'test','helloworld.txt'), (err,data) => {
    if (err)throw err;
    console.log('File renamed ...');
 });
 