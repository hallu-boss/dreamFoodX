import { useState } from "react";
import { ArrowLeftIcon, ArrowRight, Plus, X, Edit2, Check } from "lucide-react";
import { NewRecipeInfo } from "../../../pages/NewRecipe";
import { IngredientItem } from "../../../types/newRecipe";

export type NewUserIngredient = Omit<IngredientItem, "id">;

interface SkladnikiFormProps {
  formData: NewRecipeInfo;
  availCategories: string[];
  userIngredientsList: IngredientItem[];
  newIngredients: NewUserIngredient[];
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

function SkladnikiForm({
  availCategories,
  userIngredientsList,
  newIngredients,
  handlePrevStep,
  handleNextStep,
}: SkladnikiFormProps) {
  const [localUserIngredients, setLocalUserIngredients] =
    useState<IngredientItem[]>(userIngredientsList);
  const [localNewIngredients, setLocalNewIngredients] =
    useState<NewUserIngredient[]>(newIngredients);
  const [editingIds, setEditingIds] = useState<Set<number>>(new Set());
  const [editingNewIds, setEditingNewIds] = useState<Set<number>>(new Set());

  // Dodanie nowego składnika
  const addNewIngredient = () => {
    const newIngredient: NewUserIngredient = {
      title: "",
      unit: "",
      category: availCategories[0] || "",
    };
    setLocalNewIngredients([...localNewIngredients, newIngredient]);
    // Włącz tryb edycji dla nowego składnika
    setEditingNewIds((prev) => new Set([...prev, localNewIngredients.length]));
  };

  // Usunięcie składnika użytkownika
  const removeUserIngredient = (id: number) => {
    setLocalUserIngredients((prev) => prev.filter((ing) => ing.id !== id));
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    // TODO: Dodać wywołanie API do oznaczenia składnika jako usunięty
    // DELETE /ingredients/{id} lub PATCH /ingredients/{id} z flagą deleted
  };

  // Usunięcie nowego składnika
  const removeNewIngredient = (index: number) => {
    setLocalNewIngredients((prev) => prev.filter((_, i) => i !== index));
    setEditingNewIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  // Aktualizacja składnika użytkownika
  const updateUserIngredient = (
    id: number,
    field: keyof IngredientItem,
    value: string
  ) => {
    setLocalUserIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  // Aktualizacja nowego składnika
  const updateNewIngredient = (
    index: number,
    field: keyof NewUserIngredient,
    value: string
  ) => {
    setLocalNewIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    );
  };

  // Przełączenie trybu edycji dla składnika użytkownika
  const toggleEditUser = (id: number) => {
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        // TODO: Wywołanie API do zapisania zmian
        // PATCH /ingredients/{id} z danymi składnika
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Przełączenie trybu edycji dla nowego składnika
  const toggleEditNew = (index: number) => {
    setEditingNewIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Obsługa przejścia do następnego kroku
  const handleNextStepWithSave = () => {
    // TODO: Zapisz zmiany w składnikach użytkownika
    // Wywołaj PATCH dla każdego zmienionego składnika z localUserIngredients

    // TODO: Dodaj nowe składniki
    // Wywołaj POST /ingredients dla każdego składnika z localNewIngredients

    console.log(
      "Składniki użytkownika do zaktualizowania:",
      localUserIngredients
    );
    console.log("Nowe składniki do dodania:", localNewIngredients);

    handleNextStep();
  };

  const ingredients = [
    ...(localUserIngredients as NewUserIngredient[]),
    ...localNewIngredients,
  ];

  return (
    <div className="space-y-6 text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Składniki</h2>

      <div className="space-y-4">
        {/* Składniki użytkownika */}
        {localUserIngredients.map((ingredient) => {
          const isEditing = editingIds.has(ingredient.id);
          return (
            <div
              key={`user-${ingredient.id}`}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-700">
                  {ingredient.title || "Składnik użytkownika"}
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleEditUser(ingredient.id)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeUserIngredient(ingredient.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategoria
                  </label>
                  {isEditing ? (
                    <select
                      value={ingredient.category}
                      onChange={(e) =>
                        updateUserIngredient(
                          ingredient.id,
                          "category",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {availCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
                      {ingredient.category}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nazwa składnika
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={ingredient.title}
                      onChange={(e) =>
                        updateUserIngredient(
                          ingredient.id,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="np. pomidor, kurczak, sól"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
                      {ingredient.title}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jednostka miary
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateUserIngredient(
                          ingredient.id,
                          "unit",
                          e.target.value
                        )
                      }
                      placeholder="np. kg, g, ml, szt, łyżka"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
                      {ingredient.unit}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Nowe składniki */}
        {localNewIngredients.map((ingredient, index) => {
          const isEditing = editingNewIds.has(index);
          return (
            <div
              key={`new-${index}`}
              className="border border-green-200 rounded-lg p-4 bg-green-50"
            >
              <div className="flex items-center justify-end mb-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleEditNew(index)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeNewIngredient(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategoria
                  </label>
                  {isEditing ? (
                    <select
                      value={ingredient.category}
                      onChange={(e) =>
                        updateNewIngredient(index, "category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Wybierz kategorię</option>
                      {availCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
                      {ingredient.category || "Nie wybrano"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nazwa składnika
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={ingredient.title}
                      onChange={(e) =>
                        updateNewIngredient(index, "title", e.target.value)
                      }
                      placeholder="np. pomidor, kurczak, sól"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  ) : (
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
                      {ingredient.title || "Brak nazwy"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jednostka miary
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateNewIngredient(index, "unit", e.target.value)
                      }
                      placeholder="np. kg, g, ml, szt, łyżka"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  ) : (
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
                      {ingredient.unit || "Brak jednostki"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Przycisk dodania nowego składnika */}
      <button
        type="button"
        onClick={addNewIngredient}
        className="btn flex items-center"
      >
        <Plus size={20} />
        Dodaj nowy składnik
      </button>

      {/* Podgląd wszystkich składników */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-medium text-gray-800 mb-3">
          Podgląd składników ({ingredients.length}):
        </h2>
        <div className="space-y-2">
          {ingredients.length === 0 ? (
            <p className="text-gray-500 italic">Brak składników</p>
          ) : (
            ingredients.map((ingredient, index) => (
              <div key={index} className="text-sm text-gray-600">
                <strong>{index + 1}.</strong> {ingredient.title || "[nazwa]"}
                {ingredient.category && ` (${ingredient.category})`}
                {ingredient.unit && ` - jednostka: ${ingredient.unit}`}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Nawigacja */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center gap-2"
        >
          <ArrowLeftIcon size={16} />
          Wstecz
        </button>
        <button
          onClick={handleNextStepWithSave}
          className="btn flex items-center"
        >
          Dalej
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

export default SkladnikiForm;
