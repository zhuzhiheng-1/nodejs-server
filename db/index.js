const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port:3306,
  password: '5464534l',
  database: 'bs_db',
})

module.exports = db
