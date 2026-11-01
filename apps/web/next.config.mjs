import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // All data requests must go through the Fastify API on port 4000.
  // Zero Next.js API routes — this project has none.
  outputFileTracingRoot: path.join(__dirname, '../../'),
  // Expose API/Socket URLs to the browser via NEXT_PUBLIC_* in .env
};

export default nextConfig;

