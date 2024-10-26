/** @type {import('next').NextConfig} */
import { createRequire } from "module";

import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
});

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default config(nextConfig);
