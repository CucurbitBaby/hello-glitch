const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12614144",
  password: "SRfSh5Pnk9",
  database: "sql12614144",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database: ", error);
    return;
  }
  console.log("Connected to database.");
});


module.exports = connection