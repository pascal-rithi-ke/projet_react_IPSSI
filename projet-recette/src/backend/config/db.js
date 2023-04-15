// Récupération des variables d'environnement
require('dotenv').config();
const host = process.env.HOST;
const user = process.env.USER;
const pwd = process.env.PWD;
const database = process.env.DB;

// Connexion à la base de données
const mysql = require('mysql')
const db = mysql.createConnection({
host: host,
user: user,
password: pwd,
database: database 
})

// Exportation de la connexion
module.exports = db;