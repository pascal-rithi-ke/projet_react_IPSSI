// Importation des modules nécessaires pour le backend
const express = require('express');
const cors = require('cors')

// Importation de la connexion à la base de données
const db = require('./config/db')

// Importation du module de hashage de mot de passe
const bcrypt = require('bcrypt');

// Création de l'application express
const app = express();
const PORT = 3002;

// Ajout de cors pour les requêtes cross-domaine
app.use(cors());
app.use(express.json())

// Route pour la récupération des ingrédients
app.get("/api/get/ingredient", (req,res)=>{
    db.query("SELECT * FROM ingredient", (err,result)=>{
    if(err) {
        console.log(err)
    } 
        res.send(result)
    });
});

// Inscription d'un nouvel utilisateur
app.post("/api/insert/user", (req,res)=>{
    const {pseudo, password, email} = req.body;
    // génère un sel pour renforcer la sécurité du hashage
    const salt = bcrypt.genSaltSync(10);
    // hashage du mdp
    const hashedPassword = bcrypt.hashSync(password, salt);
    const sqlInsert = "INSERT INTO `user` (`pseudo`, `mdp`, `email`) VALUES (?,?,?)";
    db.query(sqlInsert, [pseudo,hashedPassword,email], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });
})

// Route pour les requêtes de recherche
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})