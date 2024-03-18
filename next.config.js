/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: "/api/auth/:path*",
            },
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Proxy to Backend
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'www.paypalobjects.com'
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
        ],
        
    },
}

module.exports = nextConfig
