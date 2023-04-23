const express = require('express')
const app = express()


// 静态文件
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/api/hello', (req, res) => {
  res.send('你好世界!')
})

module.exports = app