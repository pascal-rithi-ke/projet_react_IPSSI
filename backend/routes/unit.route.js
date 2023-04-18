import { Router } from "express";

// Import des fonctions du controller
import {
  getAllUnits,
  getUnitById,
  getUnitsByTypeID,
} from "../controllers/unit.controller.js";

const router = Router();

// Route pour la récupération des ingrédients
router.get("/", getAllUnits);
router.get("/:id", getUnitById);
router.get("/type/:id", getUnitsByTypeID);

export { router as unitsRouter };
