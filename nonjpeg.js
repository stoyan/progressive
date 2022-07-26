// take the imagemagick log from
// identify -regard-warnings *.jpg > ../log.txt
// and look for non-jpegs such as gif and png with the wrong extension
// then spit out `rm` commands to delete them
const fs = require('fs');
const path = require('path');

const dir = fs.readdirSync;
const read = fs.readFileSync;

const p = path.resolve(__dirname, 'log.txt');

const log = read(p).toString().trim().split('\n');

log.forEach(line => {
  const parts = line.split(' ');
  if (parts[1] !== 'JPEG') {
    let filename = parts[0];
    // animated gifs have indices for every frame
    // we only need one
    if (filename.includes('[0]')) {
      filename = filename.replace('[0]', '');
    }
    if (filename.includes('[')) {
      return;
    }
    console.log('rm ' + filename);
  }
});

