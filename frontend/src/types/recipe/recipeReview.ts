export type Rating = 1 | 2 | 3 | 4 | 5;

export interface RecipeReview {
    rating: Rating;
    review: string;
}