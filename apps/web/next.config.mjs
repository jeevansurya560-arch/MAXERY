/** @type {import('next').NextConfig} */
const nextConfig = {
  // All data requests must go through the Fastify API on port 4000.
  // Zero Next.js API routes — this project has none.
  experimental: {},
  // Expose API/Socket URLs to the browser via NEXT_PUBLIC_* in .env
};

export default nextConfig;
