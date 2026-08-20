/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

let remotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "5000",
    pathname: "/uploads/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "3000",
    pathname: "/uploads/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "5000",
    pathname: "/api/uploads/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "5000",
    pathname: "/uploads/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "5000",
    pathname: "/api/uploads/**",
  },
];

try {
  const parsed = new URL(apiUrl);
  remotePatterns.push(
    {
      protocol: parsed.protocol.replace(":", ""),
      hostname: parsed.hostname,
      ...(parsed.port ? { port: parsed.port } : {}),
      pathname: "/uploads/**",
    },
    {
      protocol: parsed.protocol.replace(":", ""),
      hostname: parsed.hostname,
      ...(parsed.port ? { port: parsed.port } : {}),
      pathname: "/api/uploads/**",
    }
  );
} catch {
  // ignore invalid env during build
}

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

const nextConfig = {
  images: {
    remotePatterns,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
