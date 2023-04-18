// Import de la connexion à la base de données
import db_connect from "../config/db.js";

export const getAllIngredients = (_req, res) => {
  db_connect.query(
    "SELECT ingredient.id, ingredient.nom, liste_ingredient.quantite_ingredient, unite.nom AS unite_quantite, unite.label AS unite_label FROM `ingredient` JOIN liste_ingredient on id_ingredient = ingredient.id JOIN unite on id_unite = unite.id",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des ingrédients");
      }
      res.send(result);
    }
  );
};

export const getIngredientById = (req, res) => {
  const { id } = req.params;
  db_connect.query(
    "SELECT ingredient.id, ingredient.nom, liste_ingredient.quantite_ingredient, unite.nom AS unite_quantite, unite.label AS unite_label FROM `ingredient` JOIN liste_ingredient on id_ingredient = ingredient.id JOIN unite on id_unite = unite.id WHERE ingredient.id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération de l'ingrédient");
      }
      res.send(result);
    }
  );
};

export const addIngredient = (req, res) => {
  const { name, unit } = req.body;

  let ingredientResult;

  db_connect.query(
    "INSERT INTO ingredient (nom) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout de l'ingrédient");
      } else {
        ingredientResult = result;

        db_connect.query(
          "INSERT INTO liste_ingredient (id_ingredient, id_unite) VALUES (?, ?)",
          [ingredientResult.insertId, unit],
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send("Erreur lors de l'ajout de l'ingrédient");
            }
            res.send({ ingredientResult, result });
          }
        );
      }
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
        console.error(err);
        res.status(500).send("Erreur lors de la modification de l'ingrédient");
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
        console.error(err);
        res.status(500).send("Erreur lors de la suppression de l'ingrédient");
      }
      res.send(result);
    }
  );
};
