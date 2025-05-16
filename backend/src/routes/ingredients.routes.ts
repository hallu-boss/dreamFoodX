import express from "express"
import { PrismaClient } from "@prisma/client";


const router = express.Router();
const prisma = new PrismaClient();

router.get('/all', async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.json(ingredients);
  } catch (error) {
    console.error("Błąd podczas pobierania składników:", error);
    res.status(500).json({ error: "Nie udało się pobrać składników" });
  }
})

export default router;
