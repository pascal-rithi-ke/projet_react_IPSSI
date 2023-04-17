// Import de la connexion à la base de données
import db_connect from "../config/db.js";

// Query to get all ingredients: SELECT ingredient.id, ingredient.nom, liste_ingredient.quantite_ingredient, unite.nom AS unite_quantite, unite.label AS unite_label FROM `ingredient` JOIN liste_ingredient on id_ingredient = ingredient.id JOIN unite on id_unite = unite.id;

export const getAllIngredients = (_req, res) => {
  db_connect.query(
    "SELECT ingredient.id, ingredient.nom, liste_ingredient.quantite_ingredient, unite.nom AS unite_quantite, unite.label AS unite_label FROM `ingredient` JOIN liste_ingredient on id_ingredient = ingredient.id JOIN unite on id_unite = unite.id",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

export const getIngredientById = (req, res) => {
  const { id } = req.params;
  db_connect.query(
    "SELECT * FROM ingredient WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

export const addIngredient = (req, res) => {
  const { name, quantity, unit } = req.body;
  db_connect.query(
    "INSERT INTO ingredient (name, quantity, unit) VALUES (?, ?, ?)",
    [name, quantity, unit],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

export const updateIngredient = (req, res) => {
  const { id } = req.params;
  const { name, quantity, unit } = req.body;
  db_connect.query(
    "UPDATE ingredient SET name = ?, quantity = ?, unit = ? WHERE id = ?",
    [name, quantity, unit, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

export const deleteIngredient = (req, res) => {
  const { id } = req.params;
  db_connect.query(
    "DELETE FROM ingredient WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};
