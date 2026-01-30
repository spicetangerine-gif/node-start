const mysql = require("mysql2/promise");

// pool 생성.
const pool = mysql.createPool({
  host: "localhost",
  user: "dev01",
  password: "dev01",
  database: "dev",
});

module.exports = pool;
