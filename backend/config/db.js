const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mern_auth_db'
});

// ✅ THIS LINE IS IMPORTANT
module.exports = pool.promise();