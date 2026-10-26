const fs = require('fs');

const xml = fs.readFileSync('scripts/uidump.xml', 'utf8');
const regex = /text="([^"]+)"[^>]*bounds="(\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\])"/g;
let match;
while ((match = regex.exec(xml)) !== null) {
  console.log(`${match[1]}  -->  ${match[2]}`);
}
