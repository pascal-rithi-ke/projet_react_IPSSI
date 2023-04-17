import { Router } from "express";

// Import de la connexion à la base de données
import db_connect from "../config/db.js";

// Import du module de hashage de mot de passe
import bcrypt from "bcrypt";

const router = Router();

// Route pour la connexion d'un utilisateur
router.get("/check/email", (req, res) => {
  const email = req.query.email;
  console.log(email); // Affiche la valeur de l'email dans la console du serveur
  const sqlCheck = "SELECT email FROM `user` WHERE `email` = ?";
  db_connect.query(sqlCheck, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la requête à la base de données");
    }
    console.log(result); // Affiche le résultat de la requête SQL dans la console du serveur
    res.send({ exists: result.length > 0 });
  });
});

// Inscription d'un nouvel utilisateur
router.post("/insert/user", (req, res) => {
  const { pseudo, password, email } = req.body;
  // génère un sel pour renforcer la sécurité du hashage
  const salt = bcrypt.genSaltSync(10);
  // hashage du mdp
  const hashedPassword = bcrypt.hashSync(password, salt);
  const sqlInsert =
    "INSERT INTO `user` (`pseudo`, `mdp`, `email`) VALUES (?,?,?)";
  db_connect.query(
    sqlInsert,
    [pseudo, hashedPassword, email],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

export { router as userRouter };
