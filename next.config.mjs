/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pinecone-academy-multi-step-form.vercel.app",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
