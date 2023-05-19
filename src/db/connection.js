const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '8.142.101.189',
  user: 'liuwei',
  password: 'Aa123456',
  port: 3306,
  database: 'database_vercel_demo01',
  // connectionLimit: 10, // 设置最大连接数
  // connectTimeout: 10000 // 设置连接超时时间（毫秒）
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ', error)
    return
  }
  console.log('Connected to database.')
})

module.exports = connection
