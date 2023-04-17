import { Router } from "express";

// Import de la connexion à la base de données
import db_connect from "../config/db.js";

const router = Router();

// Route pour la récupération des ingrédients
router.get("/", (_req, res) => {
  db_connect.query("SELECT * FROM ingredient", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

export { router as ingredientRouter };
