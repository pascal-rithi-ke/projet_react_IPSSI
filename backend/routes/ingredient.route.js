import { Router } from "express";

// Import des fonctions du controller
import { getIngredients } from "../controllers/ingredient.controller.js";

const router = Router();

// Route pour la récupération des ingrédients
router.get("/", getIngredients);

export { router as ingredientRouter };
