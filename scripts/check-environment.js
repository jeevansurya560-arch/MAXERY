import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.info('=== MAXERY Environment Diagnostics ===\n');

// 1. Check Node.js Version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
if (majorVersion < 20) {
  console.warn(`[WARN] Node.js version is ${nodeVersion}. Recommended is >= 20.0.0.`);
} else {
  console.info(`[OK] Node.js version: ${nodeVersion} (compatible)`);
}

// 2. Check Root .env
const rootEnvPath = path.join(rootDir, '.env');
if (!fs.existsSync(rootEnvPath)) {
  console.warn('[WARN] Root .env not found. Run "npm run setup" to create from .env.example.');
} else {
  console.info('[OK] Root .env file detected.');
}

// 3. Check App .env files
const apiEnvPath = path.join(rootDir, 'apps/api/.env');
if (!fs.existsSync(apiEnvPath)) {
  console.warn('[WARN] apps/api/.env not found.');
} else {
  console.info('[OK] apps/api/.env detected.');
}

const webEnvPath = path.join(rootDir, 'apps/web/.env');
if (!fs.existsSync(webEnvPath)) {
  console.warn('[WARN] apps/web/.env not found.');
} else {
  console.info('[OK] apps/web/.env detected.');
}

console.info('\nDiagnostics complete. Check above items if services fail to launch.\n');
