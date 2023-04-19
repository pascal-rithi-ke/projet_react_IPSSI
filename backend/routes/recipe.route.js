import { Router } from "express";

// Import des fonctions du controller
import {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  deleteIngredientFromRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

// CRUD pour les recettes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
// Enlever un ingrédient d'une recette
router.delete(
  "/:recipeId/ingredient/:ingredientId",
  deleteIngredientFromRecipe
);

export { router as recipeRouter };
