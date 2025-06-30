import { Pool } from 'pg';
import config from "./config.js";


const pool = new Pool({
  connectionString: config.postgres.uri,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const createTableQuery = `
CREATE TABLE IF NOT EXISTS urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  clicks INTEGER DEFAULT 0
);
`;

export default pool;