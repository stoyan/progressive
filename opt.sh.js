// for each of the file named 1.jpg, 2.jpg, etc
// create a shell script to optimize using various settings
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const dir = fs.readdirSync;

const p = path.resolve(__dirname, "source");

for (let i = 1; i < 14126; i++) {
  const src = `source/${i}.jpg`;
  console.log(`jpegtran -copy none -optimize -progressive ${src} > opt-tran-prog/${i}-tran-prog.jpg`);
  console.log(`jpegtran -copy none -optimize ${src} > opt-tran-base/${i}-tran-base.jpg`);
  console.log(`/usr/local/opt/mozjpeg/bin/jpegtran -copy none ${src} > opt-moz-prog/${i}-moz-prog.jpg`);
  console.log(`/usr/local/opt/mozjpeg/bin/jpegtran -revert -copy none -optimize ${src} > opt-moz-base/${i}-moz-base.jpg`);
  console.log(`/usr/local/opt/mozjpeg/bin/jpegtran -copy none -scans scans.txt ${src} > opt-moz-scans/${i}-moz-scans.jpg`);
  console.log(`jpegtran -copy none -arithmetic ${src} > opt-tran-arithmetic/${i}-tran-arithmetic.jpg`);
}