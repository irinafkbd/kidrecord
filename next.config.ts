import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(githubPages ? { basePath: "/kidrecord" } : {}),
  agentRules: false,
};

export default nextConfig;
