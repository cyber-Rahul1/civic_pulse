const fs = require('fs');

const content = fs.readFileSync('./apps/mobile/src/data/andhra-pradesh-map.ts', 'utf8');
const distMatches = [...content.matchAll(/"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
console.log('Total matches:', distMatches.length);
distMatches.forEach((m, idx) => {
  console.log(`${idx + 1}. [${m[1]}] ${m[2]}`);
});
