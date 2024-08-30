/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: { domains: ["cdn.myanimelist.net"] },
    env: {
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
        JWT_SECRET: process.env.JWT_SECRET,
        DB_USER: process.env.DB_USER,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_PORT: process.env.DB_PORT,
    }
};

export default nextConfig;
