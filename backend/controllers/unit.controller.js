// Import de la connexion à la base de données
import db_connect from "../config/db.js";

export const getAllUnits = (_req, res) => {
  db_connect.query(
    "SELECT unite.id, unite.nom, unite.label, unite.type, type_unite.nom AS type_unite FROM `unite` JOIN type_unite on type_unite.id = unite.type",
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des unités");
      }
      res.send(result);
    }
  );
};

export const getUnitById = (req, res) => {
  const { id } = req.params;
  db_connect.query(
    "SELECT unite.id, unite.nom, unite.label, unite.type, type_unite.nom AS type_unite FROM `unite` JOIN type_unite on type_unite.id = unite.type WHERE unite.id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération de l'unité");
      }
      res.send(result);
    }
  );
};

export const getUnitsByTypeID = (req, res) => {
  const { id } = req.params;
  db_connect.query(
    "SELECT unite.id, unite.nom, unite.label, unite.type, type_unite.nom AS type_unite FROM `unite` JOIN type_unite on type_unite.id = unite.type WHERE unite.type = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des unités");
      }
      res.send(result);
    }
  );
};
