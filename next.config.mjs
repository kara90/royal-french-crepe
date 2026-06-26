/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — Cloudflare Pages serves the `out/` folder directly.
  output: "export",
  images: {
    // No Next image-optimization server in a static export.
    unoptimized: true,
  },
  // Emit /path/index.html so clean URLs resolve on static hosts.
  trailingSlash: true,
};

export default nextConfig;
