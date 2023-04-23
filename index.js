const express = require('express')
const app = express()



app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/api/hello', (req, res) => {
  res.send('你好世界!')
})

// 静态文件
app.use('/static', express.static('public'))


module.exports = app