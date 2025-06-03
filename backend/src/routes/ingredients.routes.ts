import express from "express"
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authenticate";
import { addIngredient, getIngredients } from "../controllers/ingredients.controller";


const router = express.Router();
const prisma = new PrismaClient();

router.get('/all', async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      where: {
        ownerId: null,
      }
    });
    res.json(ingredients);
  } catch (error) {
    console.error("Błąd podczas pobierania składników:", error);
    res.status(500).json({ error: "Nie udało się pobrać składników" });
  }
})

router.post("/add", authenticate, addIngredient);

router.post("/get", authenticate, getIngredients);

export default router;
