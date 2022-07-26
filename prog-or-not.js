// read a log file produced by
// identify -format "%f,%b,%[quality],%[interlace]\n" *.jpg > ../stats.csv
// spit out how many files are progressive
const fs = require('fs');
const path = require('path');

const read = fs.readFileSync;

const p = path.resolve(__dirname, 'stats-moz.csv');

const log = read(p).toString().trim().split('\n');

const stats = {
  prog: 0,
  base: 0,
}

log.forEach(line => {
  const parts = line.split(',');
  if (parts[3] === '0') {
    stats.base++;
  }
  if (parts[3] === '1') {
    stats.prog++;
  }
});

console.log(stats);

