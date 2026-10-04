const fs = require('fs');
const content = fs.readFileSync('prisma/fakeData.ts', 'utf8');

const galleryPool = [
  '/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png',
  '/gallery/Kansotex-outdoor-tissus-pinterest.jpg',
  '/gallery/Kansotex-indoor-living-room-pinterest.png',
  '/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png',
  '/gallery/linen_fabric_closeup_1791052926029.jpg',
  '/gallery/bedroom_lifestyle_1791052936092.jpg',
  '/gallery/bathrobe_velour_1791048626440.jpg',
  '/gallery/tablecloth_linen_1791048647057.jpg',
  '/gallery/rug_beniouarain_1791049165733.jpg'
];

let newContent = content.replace(/image:\s*\"([^\"]+)\",/g, (match, p1) => {
  // Check if gallery is already there (to be safe)
  if (match.includes('gallery:')) return match;
  
  const count = Math.floor(Math.random() * 3) + 2;
  const picked = [];
  for (let i = 0; i < count; i++) {
    picked.push(galleryPool[Math.floor(Math.random() * galleryPool.length)]);
  }
  const galleryStr = 'gallery: [' + picked.map(p => `"${p}"`).join(', ') + '],';
  return match + '\n    ' + galleryStr;
});

fs.writeFileSync('prisma/fakeData.ts', newContent);
console.log('Done modifying fakeData.ts');
