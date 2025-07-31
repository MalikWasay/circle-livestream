const dotenv = require("dotenv");

// Fix: Default to development if NODE_ENV is not set
const env = process.env.NODE_ENV || "development";

// Load .env file based on NODE_ENV
dotenv.config({ path: `./envs/.env.${env}` });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql', // Fallback
    logging: false,
    pool: {
      min: Number(process.env.DB_MIN_CON || 0),
      max: Number(process.env.DB_MAX_CON || 5)
    }
  }
};
