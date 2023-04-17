import { Router } from "express";

// Import des fonctions du controller
import { login, insertUser } from "../controllers/user.controller.js";

const router = Router();

// Route pour la connection d'un utilisateur
router.post("/login", login);

// Inscription d'un nouvel utilisateur
router.post("/insert/user", insertUser);

export { router as userRouter };
