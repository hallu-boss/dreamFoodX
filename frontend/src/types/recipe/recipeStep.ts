import { Ingredient } from "./ingredient";

export interface RecipeStep {
    description: string;
}

export interface WeightStep extends RecipeStep {
    ingredient: Ingredient;
}

type BladeSpeed = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type TimeDuration = '${number}:${number}'

export const isValidTime = (value: string): value is TimeDuration => {
    return /^\d{1,2}:\d{2}$/.test(value);
};

type CookingTemperature = number & {readonly __brand: unique symbol}

export const createCookingTemperature = (value: number): CookingTemperature => {
    if (value < 1 || value > 10) throw new Error("Value out of bounds");
    return value as CookingTemperature;
}

export interface MixStep extends RecipeStep {
    speed: BladeSpeed; //[1, 10]
    temperature: CookingTemperature;
    duration: TimeDuration;
}