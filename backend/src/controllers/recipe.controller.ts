import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { ValidationError } from '../utils/errors';

const prisma = new PrismaClient();

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

interface NewRecipeInfo {
  title: string;
  description: string;
  category: string;
  price: number;
  steps: NewRecipeStep[];
  // Brak pola image w interfejsie, będzie obsługiwane osobno
}

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
        user: {
          select: {
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
      },
    })

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);

  } catch (error) {
    console.error('[GET /recipe/:id]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

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
