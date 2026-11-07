import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // 127.0.0.1 is a different dev origin from localhost. Without this, the
  // dev server blocks the client scripts that make the catalog interactive.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
