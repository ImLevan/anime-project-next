/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: { domains: ["cdn.myanimelist.net"] },
    env: {
        VERCEL_EMAIL_USER: process.env.VERCEL_EMAIL_USER,
        VERCEL_EMAIL_PASS: process.env.VERCEL_EMAIL_PASS,
        VERCEL_JWT_SECRET: process.env.VERCEL_JWT_SECRET,
        VERCEL_DB_USER: process.env.VERCEL_DB_USER,
        VERCEL_DB_HOST: process.env.VERCEL_DB_HOST,
        VERCEL_DB_NAME: process.env.VERCEL_DB_NAME,
        VERCEL_DB_PASSWORD: process.env.VERCEL_DB_PASSWORD,
        VERCEL_DB_PORT: process.env.VERCEL_DB_PORT,
    }
};

export default nextConfig;
