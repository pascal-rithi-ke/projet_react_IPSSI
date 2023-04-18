// Import de la connexion à la base de données
import db_connect from "../config/db.js";

// Import du module de hashage de mot de passe
import bcrypt from "bcrypt";

export const login = (req, res) => {
  const { pseudo, password } = req.body;
  const sqlCheck = "SELECT pseudo, mdp FROM `user` WHERE `pseudo` = ? LIMIT 1";
  db_connect.query(sqlCheck, [pseudo], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la requête à la base de données");
    } else {
      if (result.length > 0) {
        // Vérifier le mot de passe
        bcrypt.compare(password, result[0].mdp, (err, isValid) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send("Erreur lors de la vérification du mot de passe");
          } else {
            if (isValid) {
              res.json({
                success: true,
                message: "Connexion réussie",
                pseudo: result[0].pseudo,
              });
            } else {
              res.json({ success: false, message: "Mauvais mot de passe" });
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
};

export const insertUser = (req, res) => {
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
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout de l'utilisateur");
      }
      res.send(result);
    }
  );
};
