// Récupération des variables d'environnement
require('dotenv').config();

// Définition des variables d'environnement
const host = process.env.REACT_APP_HOST;
const user = process.env.REACT_APP_USER;
const pwd = process.env.REACT_APP_PWD;
const db = process.env.REACT_APP_DB;

// Connexion à la base de données
const mysql = require('mysql')
const db_connect = mysql.createConnection({
host: host,
user: user,
password: pwd,
database: db
})

// Exportation de la connexion
module.exports = db_connect;