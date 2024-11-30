import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Add this line to verify

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Disable SSL locally
});

export default pool;

