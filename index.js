const express = require("express");
const app = express();
const connection = require("./src/db/connection");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/user", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;

    res.json({
      code: "200",
      data: rows,
      msg: "success",
    });
  });
});

// local start:  静态文件
// app.use(express.static("public"));

// local start: 启动服务器
// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server listening on port ${process.env.PORT || 3000}`);
// });

module.exports = app
