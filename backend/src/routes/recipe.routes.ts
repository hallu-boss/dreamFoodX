import express from 'express';
import { createRecipe, getRecipe } from '../controllers/recipe.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRecipe } from '../middleware/validators';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('image');

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeStep:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Tytuł kroku
 *         stepType:
 *           type: string
 *           enum: [ADD_INGREDIENT, COOKING, DESCRIPTION]
 *           description: Typ kroku
 *         ingredientId:
 *           type: integer
 *           description: ID składnika (tylko dla ADD_INGREDIENT)
 *         amount:
 *           type: number
 *           description: Ilość składnika (tylko dla ADD_INGREDIENT)
 *         time:
 *           type: string
 *           description: Czas trwania (tylko dla COOKING)
 *         temperature:
 *           type: number
 *           description: Temperatura (tylko dla COOKING)
 *         mixSpeed:
 *           type: number
 *           description: Prędkość mieszania (tylko dla COOKING)
 *         description:
 *           type: string
 *           description: Opis (tylko dla DESCRIPTION)
 *       required:
 *         - title
 *         - stepType
 *
 *     NewRecipe:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Tytuł przepisu
 *         description:
 *           type: string
 *           description: Opis przepisu
 *         category:
 *           type: string
 *           description: Kategoria przepisu
 *         price:
 *           type: number
 *           description: Cena przepisu
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeStep'
 *           description: Kroki przepisu
 *       required:
 *         - title
 *         - description
 *         - category
 *         - price
 *         - steps
 *
 *     Recipe:
 *       allOf:
 *         - $ref: '#/components/schemas/NewRecipe'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID przepisu
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: Data utworzenia
 *             author:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *             image:
 *               type: string
 *               description: URL obrazu przepisu
 *             permission:
 *               type: boolean
 *               description: Czy użytkownik ma dostęp do pełnych szczegółów przepisu
 */

/**
 * @swagger
 * /api/recipe/create:
 *   post:
 *     summary: Tworzy nowy przepis
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               recipeData:
 *                 type: string
 *                 description: Dane przepisu w formacie JSON
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Zdjęcie przepisu
 *     responses:
 *       201:
 *         description: Przepis utworzony
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 recipe:
 *                   $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Błędne dane wejściowe
 *       401:
 *         description: Brak autoryzacji
 *       500:
 *         description: Błąd serwera
 */
router.post('/create', authenticate, uploadMiddleware, createRecipe);

/**
 * @swagger
 * /api/recipe/{id}:
 *   get:
 *     summary: Pobiera szczegóły przepisu
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID przepisu
 *     responses:
 *       200:
 *         description: Szczegóły przepisu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Nieprawidłowe ID przepisu
 *       401:
 *         description: Brak autoryzacji
 *       404:
 *         description: Przepis nie znaleziony
 *       500:
 *         description: Błąd serwera
 */
router.get('/:id', authenticate, getRecipe);

export default router;
