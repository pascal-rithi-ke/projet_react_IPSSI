// Import de la connexion à la base de données
import db_connect from "../config/db.js";

export const getAllRecipes = (_req, res) => {
  db_connect.query("SELECT * FROM recette", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des recettes");
    } else {
      res.send(results);
    }
  });
};

export const getRecipeById = (req, res) => {
  const { id } = req.params;

  db_connect.query("SELECT liste_ingredient.id as ingredient_id, ingredient.nom as ingredient_nom, quantite_ingredient as qt_ingredient, unite.nom as unite_nom, unite.id as unite_id, recette.nom as recette_nom FROM liste_ingredient JOIN ingredient on liste_ingredient.id_ingredient = ingredient.id JOIN recette on liste_ingredient.id_recette = recette.id JOIN unite on liste_ingredient.id_unite = unite.id WHERE recette.id = ?", id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération de la recette");
    } else {
      const promises = [];

      for(let i = 0; i < results.length; i++) {
        const promise = new Promise((resolve, reject) => {
          db_connect.query("SELECT unite.id as unite_id, unite.nom as unite_nom FROM unite WHERE type = (SELECT type FROM unite WHERE unite.id = ?) AND unite.id != ?", [results[i].unite_id, results[i].unite_id], (err, results2) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              results[i].unites = results2;
              resolve();
            }
          });
        });

        promises.push(promise);
      }

      Promise.all(promises).then(() => {
        res.send(results);
      }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
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
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout de la recette");
      } else {
        res.send(results);
      }
    }
  );
};

export const updateRecipe = (req, res) => {
  const recette_id  = 3;

  const {qt_ingredient, unite_id, ingredient_id} = req.body;

  db_connect.query("UPDATE `liste_ingredient` SET `quantite_ingredient` = ?, `id_unite` = ? WHERE `liste_ingredient`.`id` = ? AND `liste_ingredient`.`id_recette` = ?",
    [qt_ingredient, unite_id, ingredient_id, recette_id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification de la recette");
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
      console.error(err);
      res.status(500).send("Erreur lors de la suppression de la recette");
    } else {
      res.send(results);
    }
  });
};

export const deleteIngredientFromRecipe = (req, res) => {
  const { recipeId, ingredientId } = req.params;

  db_connect.query("DELETE FROM liste_ingredient WHERE id_recette = ? AND id_ingredient = ?", [recipeId, ingredientId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la suppression de l'ingrédient de la recette");
    } else {
      res.send({
        success: true,
        message: "L'ingrédient a bien été supprimé de la recette",
        recipe: {
          id: recipeId,
        }
      });
    }
  });
}