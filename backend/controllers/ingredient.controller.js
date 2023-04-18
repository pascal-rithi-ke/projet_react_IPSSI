// Import de la connexion à la base de données
import db_connect from "../config/db.js";

export const getAllIngredients = (_req, res) => {
  db_connect.query("SELECT * FROM ingredient", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des ingrédients");
    }
    res.send(result);
  });
};

export const getIngredientById = (req, res) => {
  const { id } = req.params;
  db_connect.query(
    "SELECT * FROM ingredient WHERE id = ?",
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
  const { name, unitId } = req.body;

  // Ajout de l'ingrédient dans la table ingredient s'il n'existe pas déjà dans la base de données
  db_connect.query(
    "INSERT IGNORE INTO ingredient SET nom = ?",
    [name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout de l'ingrédient");
      }

      // Récupération de l'id de l'ingrédient ajouté
      const ingredientId = result.insertId;

      // Ajout de l'ingrédient dans la table liste_ingredient
      db_connect.query(
        "INSERT INTO liste_ingredient (id_ingredient, id_unite) VALUES (?, ?)",
        [ingredientId, unitId],
        (err, _result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de l'ajout de l'ingrédient");
          }

          // Renvoi de la réponse au front avec les données de l'ingrédient ajouté
          res.json({
            success: true,
            message: `${name} ajouté à la liste des ingrédients`,
            ingredient: {
              id: ingredientId,
              ...req.body,
            },
          });
        }
      );
    }
  );
};

export const updateIngredient = (req, res) => {
  const { id } = req.params;
  const { name, quantity, unitId } = req.body;

  // Modification de l'ingrédient dans la table ingredient
  db_connect.query(
    "UPDATE ingredient SET nom = ? WHERE id = ?",
    [name, id],
    (err, _result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification de l'ingrédient");
      }

      // Modification de l'ingrédient dans la table liste_ingredient
      db_connect.query(
        "UPDATE liste_ingredient SET quantite_ingredient = ?, id_unite = ? WHERE id_ingredient = ?",
        [quantity, unitId, id],
        (err, _result) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("Erreur lors de la modification de l'ingrédient");
          }

          // Renvoi de la réponse au front avec les données modifiées de l'ingrédient
          res.json({
            success: true,
            ingredient: {
              id,
              ...req.body,
            },
          });
        }
      );
    }
  );
};

export const deleteIngredient = (req, res) => {
  const { id } = req.params;

  // Suppression de l'ingrédient dans la table liste_ingredient
  db_connect.query(
    "DELETE FROM liste_ingredient WHERE id_ingredient = ?",
    [id],
    (err, _result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la suppression de l'ingrédient");
      }

      // Suppression de l'ingrédient dans la table ingredient
      db_connect.query(
        "DELETE FROM ingredient WHERE id = ?",
        [id],
        (err, _result) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("Erreur lors de la suppression de l'ingrédient");
          }

          // Renvoi de la réponse au front avec l'id de l'ingrédient supprimé
          res.json({
            success: true,
            message: "L'ingrédient a bien été supprimé",
            id,
          });
        }
      );
    }
  );
};
