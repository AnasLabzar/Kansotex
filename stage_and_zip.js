const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = __dirname;
const standalone = path.join(root, '.next', 'standalone');
const stageDir = path.join(root, 'cpanel_staging');
const outputZip = path.join(root, 'kansotex-cpanel-deploy.zip');

console.log('1. Cleaning staging directory and previous zip...');
if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

if (fs.existsSync(outputZip)) {
  fs.rmSync(outputZip, { force: true });
}

console.log('2. Staging files...');
// server.js
fs.copyFileSync(path.join(standalone, 'server.js'), path.join(stageDir, 'server.js'));
// package.json
fs.copyFileSync(path.join(standalone, 'package.json'), path.join(stageDir, 'package.json'));
// .env
fs.copyFileSync(path.join(root, '.env'), path.join(stageDir, '.env'));

// .next server files from standalone
console.log('   - Copying standalone .next server build...');
fs.cpSync(path.join(standalone, '.next'), path.join(stageDir, '.next'), { recursive: true });

// .next/static client bundles
console.log('   - Copying .next/static assets...');
fs.cpSync(path.join(root, '.next', 'static'), path.join(stageDir, '.next', 'static'), { recursive: true });

// public assets
console.log('   - Copying public assets...');
fs.cpSync(path.join(root, 'public'), path.join(stageDir, 'public'), { recursive: true });

// node_modules production dependencies
console.log('   - Copying standalone node_modules...');
fs.cpSync(path.join(standalone, 'node_modules'), path.join(stageDir, 'node_modules'), { recursive: true });

console.log('3. Archiving with bsdtar (ensuring 100% POSIX / forward-slashes)...');
// Run tar from inside stageDir so files are at the root of the archive
// Note: on Windows tar, specify files and hidden items (.next, .env)
const cmd = `tar -a -cf "${outputZip}" * .next .env`;
execSync(cmd, { cwd: stageDir, stdio: 'inherit' });

console.log('4. Cleaning staging directory...');
fs.rmSync(stageDir, { recursive: true, force: true });

const stats = fs.statSync(outputZip);
const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

console.log(`\n======================================================`);
console.log(`SUCCESS! Deployment package ready:`);
console.log(`File: ${outputZip}`);
console.log(`Size: ${sizeMb} MB`);
console.log(`======================================================\n`);
