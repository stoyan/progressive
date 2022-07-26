// gather file size stats in various directories
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const dir = fs.readdirSync;

const p = path.resolve(__dirname, "source");
const data = [
  // file index,
  // original size
  // jpegtran baseline size
  // jpegtran progressive size
  // baseline - progressive
  // best of the two
  // best of the three - base, prog, original
  // mozjpeg baseline
  // mozjpeg progressive
  // baseline - progressive
  // mozjpeg all defaults
  'file,orig,tranbase,tranprog,trandiff,tran,tranopt,mozbase,mozprog,mozdiff,moz'
];
for (let i = 1; i < 14126; i++) {
  const src = `source/${i}.jpg`;
  const row = [];
  row.push(i); // file
  const source = fs.statSync(`source/${i}.jpg`)['size'];
  row.push(source); // orig
  const tranbase = fs.statSync(`opt-tran-base/${i}-tran-base.jpg`)['size'];
  const tranprog = fs.statSync(`opt-tran-prog/${i}-tran-prog.jpg`)['size'];
  row.push(tranbase);
  row.push(tranprog);
  row.push(tranbase - tranprog); // trandiff
  const tran = tranbase < tranprog ? tranbase : tranprog;
  row.push(tran); // best case tran optimization
  row.push(tran < source ? tran : source); // best case tran outcome
  const mozbase = fs.statSync(`opt-moz-base/${i}-moz-base.jpg`)['size'];
  const mozprog = fs.statSync(`opt-moz-prog/${i}-moz-prog.jpg`)['size'];
  row.push(mozbase);
  row.push(mozprog);
  row.push(mozbase - mozprog);
  row.push(fs.statSync(`opt-moz/${i}-moz.jpg`)['size']);
  data.push(row.join(','));
}

console.log(data.join('\n'));
