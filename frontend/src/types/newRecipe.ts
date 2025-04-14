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
  id: string;
  nazwa: string;
  ilosc: string;
  jednostka: string;
};

// Typ reprezentujący dostępny składnik z predefiniowanej listy
export type AvailableIngredient = {
  id: string;
  nazwa: string;
  defaultJednostka: string;
};

// Typ reprezentujący dane formularza przepisu
export type RecipeFormData = {
  nazwa: string;
  opis: string;
  kategoria: string;
  obraz: string;
  skladniki: IngredientItem[];
  kroki: { opis: string; obraz?: string }[];
};