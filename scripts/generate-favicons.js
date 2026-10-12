const fs = require('fs');
const zlib = require('zlib');

// 1. Read public/icon.png
const buf = fs.readFileSync('public/icon.png');
let pos = 8, idatChunks = [], width = 0, height = 0;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const stride = width * 4 + 1;
const img = new Uint8Array(width * height * 4);
const alphaOnly = new Uint8Array(width * height);

for (let y = 0; y < height; y++) {
  const filter = raw[y * stride];
  for (let x = 0; x < width; x++) {
    for (let c = 0; c < 4; c++) {
      let val = raw[y * stride + 1 + x * 4 + c];
      const left = x > 0 ? img[(y * width + x - 1) * 4 + c] : 0;
      const up = y > 0 ? img[((y - 1) * width + x) * 4 + c] : 0;
      const upLeft = (x > 0 && y > 0) ? img[((y - 1) * width + x - 1) * 4 + c] : 0;
      if (filter === 1) val = (val + left) & 0xff;
      else if (filter === 2) val = (val + up) & 0xff;
      else if (filter === 3) val = (val + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - upLeft);
        const pr = (pa <= pb && pa <= pc) ? left : (pb <= pc ? up : upLeft);
        val = (val + pr) & 0xff;
      }
      img[(y * width + x) * 4 + c] = val;
    }
    alphaOnly[y * width + x] = img[(y * width + x) * 4 + 3];
  }
}

// 2. Marching squares vector tracing
const bin = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  bin[i] = alphaOnly[i] > 100 ? 1 : 0;
}

const edges = new Map();
const key = (p) => p[0] + ',' + p[1];
const addEdge = (p1, p2) => { edges.set(key(p1), p2); };

for (let y = 0; y < height - 1; y++) {
  for (let x = 0; x < width - 1; x++) {
    const tl = bin[y * width + x];
    const tr = bin[y * width + x + 1];
    const br = bin[(y + 1) * width + x + 1];
    const bl = bin[(y + 1) * width + x];
    const caseId = (tl << 3) | (tr << 2) | (br << 1) | bl;
    const top = [x + 0.5, y];
    const right = [x + 1, y + 0.5];
    const bottom = [x + 0.5, y + 1];
    const left = [x, y + 0.5];
    if (caseId === 1) addEdge(bottom, left);
    else if (caseId === 2) addEdge(right, bottom);
    else if (caseId === 3) addEdge(right, left);
    else if (caseId === 4) addEdge(top, right);
    else if (caseId === 5) { addEdge(top, left); addEdge(bottom, right); }
    else if (caseId === 6) addEdge(top, bottom);
    else if (caseId === 7) addEdge(top, left);
    else if (caseId === 8) addEdge(left, top);
    else if (caseId === 9) addEdge(bottom, top);
    else if (caseId === 10) { addEdge(bottom, top); addEdge(right, left); }
    else if (caseId === 11) addEdge(right, top);
    else if (caseId === 12) addEdge(left, right);
    else if (caseId === 13) addEdge(bottom, right);
    else if (caseId === 14) addEdge(left, bottom);
  }
}

const visited = new Set();
const loops = [];
for (const startKey of edges.keys()) {
  if (visited.has(startKey)) continue;
  const loop = [];
  let curr = startKey;
  while (curr && !visited.has(curr)) {
    visited.add(curr);
    const [cx, cy] = curr.split(',').map(Number);
    loop.push([cx, cy]);
    const nextP = edges.get(curr);
    curr = nextP ? key(nextP) : null;
    if (curr === startKey) break;
  }
  if (loop.length > 10) loops.push(loop);
}

function rdp(pts, eps) {
  if (pts.length <= 2) return pts;
  let dmax = 0, idx = 0;
  const a = pts[0], b = pts[pts.length - 1];
  const den = Math.hypot(b[1] - a[1], b[0] - a[0]);
  if (den === 0) return pts;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const num = Math.abs((b[1] - a[1]) * p[0] - (b[0] - a[0]) * p[1] + b[0] * a[1] - b[1] * a[0]);
    const d = num / den;
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax > eps) {
    const r1 = rdp(pts.slice(0, idx + 1), eps);
    const r2 = rdp(pts.slice(idx), eps);
    return r1.slice(0, -1).concat(r2);
  } else {
    return [a, b];
  }
}

function simplifyLoop(loop, eps) {
  let maxD = 0, splitIdx = 0;
  const p0 = loop[0];
  for (let i = 1; i < loop.length; i++) {
    const d = Math.hypot(loop[i][0] - p0[0], loop[i][1] - p0[1]);
    if (d > maxD) { maxD = d; splitIdx = i; }
  }
  const arc1 = loop.slice(0, splitIdx + 1);
  const arc2 = loop.slice(splitIdx).concat([loop[0]]);
  const s1 = rdp(arc1, eps);
  const s2 = rdp(arc2, eps);
  return s1.slice(0, -1).concat(s2.slice(0, -1));
}

const simplifiedLoops = loops.map(l => simplifyLoop(l, 0.7));

// Build SVG path data
let pathD = '';
for (const loop of simplifiedLoops) {
  if (loop.length < 3) continue;
  pathD += `M${loop[0][0].toFixed(1)} ${loop[0][1].toFixed(1)} `;
  for (let i = 1; i < loop.length; i++) {
    pathD += `L${loop[i][0].toFixed(1)} ${loop[i][1].toFixed(1)} `;
  }
  pathD += 'Z ';
}

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <style>
    path {
      fill: #111111;
    }
    @media (prefers-color-scheme: dark) {
      path {
        fill: #ffffff;
      }
    }
  </style>
  <path fill-rule="evenodd" d="${pathD.trim()}" />
</svg>
`;

fs.writeFileSync('public/icon.svg', svgContent);
fs.writeFileSync('app/icon.svg', svgContent);
console.log('SVG written to public/icon.svg and app/icon.svg. Size:', svgContent.length);

// 3. Also generate icon-light.png and icon-dark.png using raw PNG writer
function writePng(filePath, rVal, gVal, bVal) {
  // raw uncompressed RGBA with filter 0
  const outStride = width * 4 + 1;
  const rawOut = Buffer.alloc(height * outStride);
  for (let y = 0; y < height; y++) {
    rawOut[y * outStride] = 0; // Filter 0 (None)
    for (let x = 0; x < width; x++) {
      const a = alphaOnly[y * width + x];
      const offset = y * outStride + 1 + x * 4;
      rawOut[offset] = rVal;
      rawOut[offset + 1] = gVal;
      rawOut[offset + 2] = bVal;
      rawOut[offset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawOut);
  
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  
  function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    // CRC
    const crc = crc32(Buffer.concat([Buffer.from(type, 'ascii'), data]));
    chunk.writeInt32BE(crc, 8 + len);
    return chunk;
  }
  
  // CRC32 table
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ -1) | 0;
  }
  
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  
  const finalPng = Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(filePath, finalPng);
  console.log('Written:', filePath, 'bytes:', finalPng.length);
}

writePng('public/icon-light.png', 0, 0, 0);
writePng('public/icon-dark.png', 255, 255, 255);
writePng('app/icon-light.png', 0, 0, 0);
writePng('app/icon-dark.png', 255, 255, 255);
