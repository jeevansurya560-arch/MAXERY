import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.info('=============================================');
console.info('      MAXERY Local Development Setup         ');
console.info('=============================================\n');

function copyIfNotExists(src, dest) {
  if (!fs.existsSync(dest)) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.info(`[CREATED] ${path.relative(rootDir, dest)} (from ${path.relative(rootDir, src)})`);
    } else {
      console.warn(`[SKIP] Template not found: ${path.relative(rootDir, src)}`);
    }
  } else {
    console.info(`[EXISTS]  ${path.relative(rootDir, dest)} already exists.`);
  }
}

// 1. Ensure root .env
copyIfNotExists(path.join(rootDir, '.env.example'), path.join(rootDir, '.env'));

// 2. Ensure apps/api/.env
copyIfNotExists(path.join(rootDir, 'apps/api/.env.example'), path.join(rootDir, 'apps/api/.env'));

// 3. Ensure apps/web/.env
copyIfNotExists(path.join(rootDir, 'apps/web/.env.example'), path.join(rootDir, 'apps/web/.env'));

console.info('\nSetup steps:');
console.info('1. If using Docker, run: docker compose up -d');
console.info('2. Generate Prisma client: npm run db:generate');
console.info('3. Push or migrate database schema: npm run db:push (or npm run db:migrate)');
console.info('4. Seed initial dev synthetic data: npm run db:seed');
console.info('5. Start development servers: npm run dev\n');
