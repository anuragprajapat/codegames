const mysql = require("mysql");
var env = process.env.NODE_ENV || "development";
var dbConfig = require("./config")[env]["database"];

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.userName,
  password: dbConfig.password,
  database: dbConfig.db,
});

console.log(dbConfig);

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
