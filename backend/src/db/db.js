const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_DB_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise()

// 🔍 Test database connection ONCE at startup
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    // Keep the process available for diagnostics; individual requests will
    // return their database error instead of taking down the API server.
  }
}
testConnection()
module.exports = pool
