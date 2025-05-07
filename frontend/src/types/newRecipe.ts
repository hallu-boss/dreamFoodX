// Types.ts - Definicje typów dla aplikacji

// Typ reprezentujący krok formularza
export type RecipeFormStep = "informacje" | "skladniki" | "kroki";

// Typ reprezentujący element kroku w menu nawigacji
export type StepItem = {
  id: RecipeFormStep;
  label: string;
};

// Typ reprezentujący pojedynczy składnik
export type IngredientItem = {
  id: number;
  title: string;
  unit: string;
  category: string;
};

// Typ reprezentujący dostępny składnik z predefiniowanej listy
export type AvailableIngredient = {
  id: string;
  nazwa: string;
  defaultJednostka: string;
};

export interface StepData {
  nazwa: string;
  stepType: string;
  opis: string;
  skladnik: number;
  ilosc?: string;
  czas: string;
  temperatura: number;
  predkoscOstrzy: number;
}

// Typ reprezentujący dane formularza przepisu
export type RecipeFormData = {
  nazwa: string;
  opis: string;
  kategoria: string;
  obraz?: File;
  kroki: StepData[];
};
