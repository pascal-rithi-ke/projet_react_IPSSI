const mysql = require('mysql')
const db = mysql.createConnection({
host: "mysql-projet-recette.alwaysdata.net",
user: "309592",
password: "8k5kxdYEqzt7ixT",
database:"projet-recette_ipssi" 
})

module.exports = db;