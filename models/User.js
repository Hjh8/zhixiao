const mysql = require('mysql')
const connect = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '5642818',
  database : 'zhixiao'
})
module.exports = connection = connect.connect()