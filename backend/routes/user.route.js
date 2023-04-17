import { Router } from "express";

// Import des fonctions du controller
import { checkEmail, insertUser } from "../controllers/user.controller.js";

const router = Router();

// Route pour la connexion d'un utilisateur
router.get("/check/email", checkEmail);

// Inscription d'un nouvel utilisateur
router.post("/insert/user", insertUser);

export { router as userRouter };
