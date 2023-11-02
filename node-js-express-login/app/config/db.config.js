require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "root1234",
  DB: process.env.DB_NAME || "world",
  dialect: process.env.DB_DIALECT || "mysql",
  pool: {
    max: process.env.DB_POOL_MAX || 5,
    min: process.env.DB_POOL_MIN || 0,
    acquire: process.env.DB_POOL_ACQUIRE || 30000,
    idle: process.env.DB_POOL_IDLE || 10000
  }
};
