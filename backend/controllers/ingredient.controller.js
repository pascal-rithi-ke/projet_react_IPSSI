// Import de la connexion à la base de données
import db_connect from "../config/db.js";

export const getIngredients = (_req, res) => {
  db_connect.query("SELECT * FROM ingredient", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};
