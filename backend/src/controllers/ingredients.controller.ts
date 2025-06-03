import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const addIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const { category, title, unit } = req.body;

    try {
      const ingredient = await prisma.ingredient.create({
        data: {
          category,
          title,
          unit,
          ownerId: userId,
        },
      });
      return res.status(201).json(ingredient);
    } catch (error) {
      return res.status(500).json({ error: "Nie udało się dodać składnika" });
    }
  } catch (error) {
    next(error);
  }
};

export const getIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const ingredients = await prisma.ingredient.findMany({
      where: {
        ownerId: userId,
      }
    });
    res.json(ingredients);
    try {
    } catch (error) {
      return res.status(500).json({ error: "Nie udało się pobrać listy składników" });
    }
  } catch (error) {
    next(error);
  }
};
