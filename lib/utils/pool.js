require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.LOCALHOST_URL || process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

module.exports = pool;
