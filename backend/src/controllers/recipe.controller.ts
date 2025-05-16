import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { ValidationError } from '../utils/errors';

const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeStep:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         stepType:
 *           type: string
 *           enum: [ADD_INGREDIENT, COOKING, DESCRIPTION]
 *         ingredientId:
 *           type: integer
 *         amount:
 *           type: number
 *         time:
 *           type: string
 *         temperature:
 *           type: number
 *         mixSpeed:
 *           type: number
 *         description:
 *           type: string
 */
interface NewRecipeStep {
  title: string;
  stepType: 'ADD_INGREDIENT' | 'COOKING' | 'DESCRIPTION';

  ingredientId?: number;
  amount?: number;

  time?: string;
  temperature?: number;
  mixSpeed?: number;

  description?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     NewRecipeInfo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         price:
 *           type: number
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeStep'
 */
interface NewRecipeInfo {
  title: string;
  description: string;
  category: string;
  price: number;
  steps: NewRecipeStep[];
  // Brak pola image w interfejsie, będzie obsługiwane osobno
}

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API dla zarządzania przepisami
 */

/**
 * @swagger
 * /api/recipe/{id}:
 *   get:
 *     summary: Pobiera szczegóły przepisu po ID
 *     description: Zwraca szczegóły przepisu. Jeśli użytkownik jest autorem, kupił przepis lub przepis jest darmowy, zwracane są pełne szczegóły.
 *     tags: [Recipes]
 */
export const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const recipeId = parseInt(req.params.id)
  if (isNaN(recipeId))
    return res.status(400).json({ error: 'Invalid recipe ID' })

  try {
    const recipe = await prisma.recipe.findUniqueOrThrow({
      where: { id: recipeId },
      select: {
        id: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            surname: true
          }
        },
        title: true,
        description: true,
        category: true,
        price: true,
        image: true,
        steps: {
          select: {
            id: true,
            title: true,
            stepType: true,
            description: true,
            ingredient: {
              select: {
                title: true,
                unit: true,
              }
            },
            amount: true,
            time: true,
            temperature: true,
            mixSpeed: true,
          }
        },
        reviews: true,
        purchasers: {
          select: {
            id: true
          }
        }
      },
    })

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const userId = (req as any).user.id;

    const isAuthor = recipe.author.id === userId;
    const hasPurchased = recipe.purchasers.some(p => p.id === userId);
    const isFree = Number(recipe.price) === 0;

    const baseRecipeData = {
      id: recipe.id,
      createdAt: recipe.createdAt,
      author: recipe.author,
      title: recipe.title,
      category: recipe.category,
      price: recipe.price,
      image: recipe.image,
    };

    if (isAuthor || hasPurchased || isFree) {
      return res.json({
        ...recipe,
        permission: true
      });
    }

    return res.json({
      ...baseRecipeData,
      permission: false
    });
  } catch (error) {
    console.error('[GET /recipe/:id]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * @swagger
 * /api/recipe/create:
 *   post:
 *     summary: Tworzy nowy przepis
 *     description: Tworzy nowy przepis z podanymi danymi i opcjonalnym obrazem
 *     tags: [Recipes]
 */
export const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;

    // Parsowanie danych przepisu z JSON
    const recipeData: NewRecipeInfo = req.body.recipeData
      ? JSON.parse(req.body.recipeData)
      : req.body;

    const { title, description, category, price, steps } = recipeData;


    // Sprawdź czy wszystkie składniki istnieją
    for (const step of steps) {
      if (step.stepType !== 'ADD_INGREDIENT')
        continue;
      const ingredient = await prisma.ingredient.findUnique({
        where: { id: step.ingredientId }
      });
      if (!ingredient) {
        throw new ValidationError(`Składnik o ID ${step.ingredientId} nie istnieje`, 400);
      }
    }

    let imageUrl = '';

    // Obsługa pliku obrazu, jeśli istnieje
    if (req.file) {
      // Utwórz FormData do wysłania do Cloudinary
      const fileFormData = new FormData();

      // Konwersja bufora pliku na Blob
      const fileBlob = new Blob([req.file.buffer], { type: req.file.mimetype });

      fileFormData.append('file', fileBlob, req.file.originalname);
      fileFormData.append('upload_preset', 'dreamFoodX-images');
      fileFormData.append('api_key', process.env.CLOUDINARY_API_KEY || "123");

      const imgRes = await fetch('https://api.cloudinary.com/v1_1/dco9zum8l/image/upload', {
        method: 'POST',
        body: fileFormData
      }).then(r => r.json());

      if (imgRes.secure_url) {
        imageUrl = imgRes.secure_url;
      } else {
        throw new Error('Failed to upload image to Cloudinary');
      }
    }

    // Utwórz przepis z krokami
    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        category,
        price,
        image: imageUrl,
        userId,
        steps: {
          create: steps
        }
      },
      include: {
        steps: true
      }
    });

    res.status(201).json({
      message: 'Przepis utworzony pomyślnie',
      recipe: {
        ...newRecipe,
        price: Number(newRecipe.price) // Konwersja Decimal na number
      }
    });
  } catch (error) {
    next(error);
  }
};
