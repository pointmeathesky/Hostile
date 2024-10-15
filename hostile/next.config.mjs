/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
    },
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'webpage-1990-colourised.neocities.org',
            },
            {
                protocol: 'https',
                hostname: 'www.webdesignmuseum.org',
            },
        ],
    },
};

export default nextConfig;
