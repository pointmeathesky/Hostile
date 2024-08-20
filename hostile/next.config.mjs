/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
    },
    output: "standalone",
};

export default nextConfig;
