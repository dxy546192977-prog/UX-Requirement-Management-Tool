/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd()
  },
  outputFileTracingIncludes: {
    "/api/**/*": [
      "./data/**/*",
      "./skills/**/*",
      "./.agents/skills/yuque-doc-fetch/**/*",
      "./public/pages/**/*"
    ]
  }
};

export default nextConfig;
