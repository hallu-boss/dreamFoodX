// Data.ts - Dane statyczne dla aplikacji
import { AvailableIngredient, StepItem } from './Types';

// Dostępne składniki
export const availableIngredients: AvailableIngredient[] = [
  { id: "1", nazwa: "Mąka pszenna", defaultJednostka: "g" },
  { id: "2", nazwa: "Jajka", defaultJednostka: "szt." },
  { id: "3", nazwa: "Mleko", defaultJednostka: "ml" },
  { id: "4", nazwa: "Cukier", defaultJednostka: "g" },
  { id: "5", nazwa: "Masło", defaultJednostka: "g" },
  { id: "6", nazwa: "Proszek do pieczenia", defaultJednostka: "łyżeczka" },
  { id: "7", nazwa: "Sól", defaultJednostka: "szczypta" },
  { id: "8", nazwa: "Olej", defaultJednostka: "ml" },
  { id: "9", nazwa: "Drożdże", defaultJednostka: "g" },
  { id: "10", nazwa: "Cebula", defaultJednostka: "szt." },
];

// Kroki formularza
export const formSteps: StepItem[] = [
  { id: "informacje", label: "Informacje" },
  { id: "skladniki", label: "Składniki" },
  { id: "kroki", label: "Kroki" },
];