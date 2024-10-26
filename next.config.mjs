/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**", // Adjust this if you need to restrict to specific paths
      },
    ],
  },
};

export default nextConfig;
