/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Cloud Run: build autocontenido (server.js) para imagen Node mínima.
  output: "standalone",
};

export default nextConfig;
