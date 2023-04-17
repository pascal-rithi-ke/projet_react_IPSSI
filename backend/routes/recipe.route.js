import { Router } from "express";

// Import des fonctions du controller
import {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

// CRUD pour les recettes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export { router as recipeRouter };
