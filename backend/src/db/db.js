const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected");
    connection.release();
    try {
      const initializeDatabase = require('./initDb');
      await initializeDatabase();
    } catch (initErr) {
      console.error("⚠️ Table initialization error:", initErr.message);
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}
testConnection();

module.exports = pool;
