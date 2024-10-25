/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Ensures Firebase images load correctly
  },
};

export default nextConfig;
