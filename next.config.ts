import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/joias",
  assetPrefix: "/joias",
  trailingSlash: true,
};

export default nextConfig;
