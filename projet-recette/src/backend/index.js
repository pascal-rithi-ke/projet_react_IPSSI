// Importation des modules nécessaires pour le backend
const express = require('express');
const cors = require('cors')

// Importation de la connexion à la base de données
const db = require('./config/db')

// Création de l'application express
const app = express();
const  PORT = 3002;

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

// Route pour les requêtes de recherche
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})