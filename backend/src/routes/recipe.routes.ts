import express from 'express';
import { createRecipe, getRecipe } from '../controllers/recipe.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRecipe } from '../middleware/validators';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('image');

router.post('/create', authenticate, uploadMiddleware, createRecipe);
router.get('/:id', getRecipe)

export default router;
