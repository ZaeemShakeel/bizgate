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
    hostname: "127.0.0.1",
    port: "5000",
    pathname: "/uploads/**",
  },
];

try {
  const parsed = new URL(apiUrl);
  remotePatterns.push({
    protocol: parsed.protocol.replace(":", ""),
    hostname: parsed.hostname,
    ...(parsed.port ? { port: parsed.port } : {}),
    pathname: "/uploads/**",
  });
} catch {
  // ignore invalid env during build
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
