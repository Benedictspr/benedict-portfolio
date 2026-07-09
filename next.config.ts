import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/nurse',
        destination: '/nursing',
        permanent: true,
      },
      {
        source: '/research',
        destination: '/nursing',
        permanent: true,
      },
      {
        source: '/content-strategy',
        destination: '/writing',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
