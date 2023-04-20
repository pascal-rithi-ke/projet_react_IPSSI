import { Router } from "express";

// Import des fonctions du controller
import {
  getAllIngredients,
  getIngredientById,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  searchIngredient,
  ingredientAlreadyExists
} from "../controllers/ingredient.controller.js";

const router = Router();

// Route pour la récupération des ingrédients
router.get("/", getAllIngredients);
router.get("/:id", getIngredientById);
router.post("/", addIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);
router.get('/search/:name', searchIngredient)
router.post('/addToRecipe', ingredientAlreadyExists)

export { router as ingredientRouter };
