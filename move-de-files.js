const fse = require('fs-extra');
const del = require('del');

console.log('> Script "move-de-files.js" started...');
fse.pathExists('dist/de').then((exists) => {
  if (exists) {
    console.log('> Move files (locale "de") to root folder...');
    fse.copySync('dist/de', 'dist', {overwrite: true});
    del.sync(['dist/de']);
  } else {
    console.log('> No folder "de" found. Nothing is to do.');
  }
  console.log('> Success!');
});
console.log('> Script "move-de-files.js" finished.');
