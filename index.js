const express = require('express')
const app = express()

// 静态文件
app.use(express.static('public'))

// 接口
app.get('/api/hello', (req, res) => {
  res.send('Hello World!')
})

// 启动服务器
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`)
})
