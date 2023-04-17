// Importation des modules nécessaires pour le backend
import express from 'express';
import cors from 'cors';

// Importation de la connexion à la base de données
import db_connect from './config/db.js';

// Importation du module de hashage de mot de passe
import bcrypt from 'bcrypt';

// Création de l'application express
const app = express();
const PORT = 3002;

// Ajout de cors pour les requêtes cross-domaine
app.use(cors());
app.use(express.json())

// Route pour la récupération des ingrédients
app.get("/api/get/ingredient", (req,res)=>{
    db_connect.query("SELECT * FROM ingredient", (err,result)=>{
    if(err) {
        console.log(err)
    } 
        res.send(result)
    });
});

app.post('/api/login', (req, res) => {
    const { pseudo, password } = req.body;
    const sqlCheck = 'SELECT pseudo, mdp FROM `user` WHERE `pseudo` = ? LIMIT 1';
    db_connect.query(sqlCheck, [pseudo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erreur lors de la requête à la base de données');
        } else {
            if (result.length > 0) {
                // Vérifier le mot de passe
                bcrypt.compare(password, result[0].mdp, (err, isValid) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Erreur lors de la vérification du mot de passe');
                    } else {
                        if (isValid) {
                            res.json({ success: true, message: 'Connexion réussie' });
                        } else {
                            res.json({ success: false, message: 'Mauvais mot de passe' });
                        }
                    }
                    return;
                });
            } else {
                res.json({ success: false, message: "L'utilisateur n'existe pas" });
                return;
            }
        }
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
    db_connect.query(sqlInsert, [pseudo,hashedPassword,email], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });
})

// Route pour la connexion d'un utilisateur
app.get("/api/check/email", (req,res)=>{
    const email = req.query.email;
    console.log(email); // Affiche la valeur de l'email dans la console du serveur
    const sqlCheck = "SELECT email FROM `user` WHERE `email` = ?";
    db_connect.query(sqlCheck, [email], (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).send('Erreur lors de la requête à la base de données');
        }
        console.log(result); // Affiche le résultat de la requête SQL dans la console du serveur
        res.send({exists: result.length > 0})
    });
})

// Route pour les requêtes de recherche
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})