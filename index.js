const express = require('express')
const app = express()
const connection = require('./src/db/connection')
const bodyParser = require('body-parser')

// 使用 body-parser 中间件解析请求体中的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/api/user', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err

    res.json({
      code: '200',
      data: rows,
      msg: 'success'
    })
  })
})

app.get('/api/tables', (req, res) => {
  connection.query('SHOW TABLES FROM database_vercel_demo01', (err, rows) => {
    if (err) throw err

    res.json({
      code: '200',
      data: rows.map((e) => ({ name: e.Tables_in_database_vercel_demo01 })),
      msg: 'success'
    })
  })
})

app.post('/api/add/table', (req, res) => {
  // 从 req.body 中获取用户传递过来的数据
  const { table_name, fields_list } = req.body

  if (!table_name || !fields_list.length) {
    res.json({
      code: '200',
      data: null,
      msg: '请传递正确数据'
    })
  }
  let createTableQuery = `CREATE TABLE IF NOT EXISTS ${table_name} (`

  fields_list.forEach((field, index) => {
    createTableQuery += `${field.fields_name} ${field.fields_type}`
    if (index !== fields_list.length - 1) {
      createTableQuery += ', '
    }
  })

  createTableQuery += ')'

  connection.query(createTableQuery, (error, results, fields) => {
    if (error) throw error
    res.send({
      code: '200',
      data: null,
      msg: `数据表 '${table_name}' 创建成功!`
    })
  })
})

// local start:  静态文件
app.use(express.static('public'))

// local start: 启动服务器
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`)
})

// module.exports = app
