import { Router } from "express";

// Import des fonctions du controller
import {
  getAllIngredients,
  getIngredientById,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredient.controller.js";

const router = Router();

// Route pour la récupération des ingrédients
router.get("/", getAllIngredients);
router.get("/:id", getIngredientById);
router.post("/", addIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);

export { router as ingredientRouter };
