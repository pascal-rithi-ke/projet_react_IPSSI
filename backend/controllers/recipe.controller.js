// Import de la connexion à la base de données
import db_connect from "../config/db.js";

export const getAllRecipes = (_req, res) => {
  db_connect.query("SELECT * FROM recette", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
};

export const getRecipeById = (req, res) => {
  const { id } = req.params;

  db_connect.query("SELECT * FROM recette WHERE id = ?", id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
};

export const addRecipe = (req, res) => {
  const { nom, description, url_img, ingredients } = req.body;

  db_connect.query(
    "INSERT INTO recette (nom, description, url_img, ingredients) VALUES (?, ?, ?, ?)",
    [nom, description, url_img, ingredients],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

export const updateRecipe = (req, res) => {
  const { id } = req.params;
  const { nom, description, url_img, ingredients } = req.body;

  db_connect.query(
    "UPDATE recette SET nom = ?, description = ?, url_img = ?, ingredients = ? WHERE id = ?",
    [nom, description, url_img, ingredients, id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

export const deleteRecipe = (req, res) => {
  const { id } = req.params;

  db_connect.query("DELETE FROM recette WHERE id = ?", id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
};
