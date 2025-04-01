import { RecipeReview, Rating } from "./recipeReview";
import { RecipeStep } from "./recipeStep";

export interface Recipe {
    recipeSteps: RecipeStep[];
    creator: string;
    rating: Rating;
    categories: string[];
    price: number;
    reviews: RecipeReview;
}