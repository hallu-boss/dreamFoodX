import { Ingredient } from "./ingredient";
import { RecipeReview, Rating } from "./recipeReview";
import { RecipeStep } from "./recipeStep";

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