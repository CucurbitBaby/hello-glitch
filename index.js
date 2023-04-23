const express = require('express')
const app = express()

// 接口
app.get('/api/hello', (req, res) => {
  res.send('Hello World!')
})

// 静态文件
app.use(express.static('public'))

// 启动服务器
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT || 3001}`)
})
