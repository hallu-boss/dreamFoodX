import { Ingredient } from "./ingredient";
import { RecipeReview, Rating } from "./recipeReview";

export interface Recipe {
  title: string;
  imgSrc: string;
  creator: string;
  ingridients: Ingredient[];
  recipeSteps: RecipeStep[];
  categories: string[];
  price: number;
  rating: Rating;
  reviews: RecipeReview;
}

interface StepBase {
  title: string;
  stepType: 'ADD_INGREDIENT' | 'COOKING' | 'DESCRIPTION';
}

export interface AddIngredientStep extends StepBase {
  stepType: 'ADD_INGREDIENT';
  ingredient: number;
  amount: number;
}


export interface CookingStep extends StepBase {
  stepType: 'COOKING';
  time: string;
  temperature: number;
  mixSpeed: number;
}

export interface DescriptionStep extends StepBase {
  stepType: 'DESCRIPTION';
  stepDescription: string;
}

export type RecipeStep = AddIngredientStep | CookingStep | DescriptionStep;
