import { useState } from "react";
import { IngredientItem } from "../../../types/newRecipe";
import { NewRecipeStep } from "../../../pages/NewRecipe";

interface AddIngredientViewProps {
  ingredients: IngredientItem[];
  addIngredientStep: NewRecipeStep;
  setAddIngredientStep: React.Dispatch<React.SetStateAction<NewRecipeStep>>
}

export function AddIngredientView({ ingredients, addIngredientStep, setAddIngredientStep }: AddIngredientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = Array.from(
    new Set(ingredients.map((ing) => ing.category))
  );

  const filteredIngredients = selectedCategory
    ? ingredients.filter((ing) => ing.category === selectedCategory)
    : [];

  const selectedIngredient = filteredIngredients.find((ing) => ing.id === addIngredientStep.ingredientId)

  const unit = selectedIngredient?.unit || "";

  return (
    <div className="mb-4 flex space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kategoria składnika
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className="w-full p-2 border rounded bg-gray-50"
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Składnik
        </label>
        <select
          name="skladnik"
          value={selectedIngredient?.id}
          onChange={(e) => {
            setAddIngredientStep({
              ...addIngredientStep,
              ingredientId: Number(e.target.value)
            })
          }}
          className="w-full p-2 border rounded bg-gray-50"
          disabled={!selectedCategory}
          required
        >
          <option value="">Wybierz składnik</option>
          {filteredIngredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ilość {unit ? `[${unit}]` : ''}
        </label>
        <input
          type="number"
          name="ilosc"
          value={addIngredientStep.amount}
          onChange={(e) => {
            setAddIngredientStep({
              ...addIngredientStep,
              amount: Number(e.target.value)
            })
          }}
          pattern="\d*"
          placeholder="100"
          className="w-full p-2 border rounded"
          required
        />
      </div>
    </div>
  )
}
