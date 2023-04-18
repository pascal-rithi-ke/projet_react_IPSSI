// Importation des modules nécessaires pour le backend
import express from "express";
import cors from "cors";

// Création de l'application express
const app = express();
const PORT = 3002;

// Ajout de cors pour les requêtes cross-domaine
app.use(cors());
app.use(express.json());

// Import des routes
import {
  ingredientRouter,
  recipeRouter,
  unitsRouter,
  userRouter,
} from "./routes/index.js";

app.use("/api", userRouter);
app.use("/api/ingredient", ingredientRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/unit", unitsRouter);

// Route pour les requêtes de recherche
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
