const fs = require('fs');
const path = require('path');

const serverFile = path.join(__dirname, '.next', 'standalone', 'server.js');
let code = fs.readFileSync(serverFile, 'utf8');

// Replace lines 8 and 9
const portRepl = `
// Universal LiteSpeed / Passenger socket & environment loader
try {
  const { loadEnvConfig } = require('@next/env');
  loadEnvConfig(dir);
} catch (e) {
  const envPath = path.join(dir, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const rawPort = process.env.PORT;
let currentPort;
let hostname;

if (rawPort && isNaN(Number(rawPort))) {
  // LiteSpeed or Passenger Unix Domain Socket
  currentPort = rawPort;
  hostname = undefined;
} else if (rawPort && !isNaN(Number(rawPort))) {
  currentPort = parseInt(rawPort, 10);
  hostname = process.env.HOSTNAME || '0.0.0.0';
} else {
  currentPort = 3000;
  hostname = process.env.HOSTNAME || '0.0.0.0';
}
`;

code = code.replace(/const currentPort = parseInt\(process\.env\.PORT, 10\) \|\| 3000\r?\nconst hostname = process\.env\.HOSTNAME \|\| '0\.0\.0\.0'/, portRepl);

// Fix Windows hardcoded paths
const configFix = `
nextConfig.outputFileTracingRoot = dir;
nextConfig.repoRoot = dir;
if (nextConfig.turbopack) {
  nextConfig.turbopack.root = dir;
}
process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);
`;

code = code.replace(/process\.env\.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON\.stringify\(nextConfig\)/, configFix);

// Replace startServer call to the end of file cleanly
const startServerIdx = code.indexOf('startServer({');
if (startServerIdx !== -1) {
  code = code.slice(0, startServerIdx) + `process.on('uncaughtException', (err) => {
  console.error('[KANSOTEX UNCAUGHT EXCEPTION]:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('[KANSOTEX UNHANDLED REJECTION]:', reason);
});

startServer({
  dir,
  isDev: false,
  config: nextConfig,
  hostname,
  port: currentPort,
  allowRetry: false,
  keepAliveTimeout,
}).then(() => {
  console.log(\`[Kansotex Server] Ready and listening on \${hostname ? hostname + ':' : ''}\${currentPort}\`);
}).catch((err) => {
  console.error('[Kansotex Server] Failed to start:', err);
  process.exit(1);
});
`;
}

fs.writeFileSync(serverFile, code, 'utf8');
console.log('Successfully patched .next/standalone/server.js cleanly!');
