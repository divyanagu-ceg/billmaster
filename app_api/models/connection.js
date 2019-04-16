var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expense_tracker"
});
console.log("In connection.js");

con.connect(function(err) {
  if (err){
		throw err;
  }else{
	  console.log("Connected to MySQL database!!");
  } 
});

module.exports = con;