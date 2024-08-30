import { Pool } from "pg";

const pool = new Pool({
    user: process.env.VERCEL_DB_USER,
    host: process.env.VERCEL_DB_HOST,
    database: process.env.VERCEL_DB_NAME,
    password: process.env.VERCEL_DB_PASSWORD,
    port: process.env.VERCEL_DB_PORT,
});

export default pool;