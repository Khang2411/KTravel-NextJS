/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXTAUTH_URL:'https://ktravel.io.vn',
      NEXTAUTH_SECRET:'wmsjUYfJFranGO7muCrJfdb+M5gK3iMENEMCrW+n20M',

      NEXT_PUBLIC_NAME:'ktravel.io.vn',
      NEXT_PUBLIC_API_URL:'https://admin.ktravel.io.vn',
      NEXT_PUBLIC_URL:'https://ktravel.io.vn',

      GOOGLE_CLIENT_ID:'880076609170-g03thcmhcj24bc3uusi6tudir7gh6hmv.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET:'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'
  },
  
  reactStrictMode: false,

  experimental: {
    serverActions: true,
  },
  
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*",
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Proxy to Backend
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.paypalobjects.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
  modularizeImports: {
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
};

module.exports = nextConfig;
