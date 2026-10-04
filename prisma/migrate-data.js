const fs = require('fs');
let content = fs.readFileSync('prisma/fakeData.ts', 'utf8');

// Replace name
content = content.replace(/name:\s*"([^"]+)"/g, 'nameFr: "$1",\n    nameEn: "$1 (EN)"');
// Replace description
content = content.replace(/description:\s*"([^"]+)"/g, 'descriptionFr: "$1",\n    descriptionEn: "$1 (EN)"');
// Replace colorName
content = content.replace(/colorName:\s*"([^"]+)"/g, 'colorNameFr: "$1",\n    colorNameEn: "$1 (EN)"');

fs.writeFileSync('prisma/fakeData.ts', content);
console.log("Done");
