import { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  ArrowRight,
  Plus,
  X,
  Edit2,
  Check,
  AlertTriangle,
} from "lucide-react";
import { IngredientItem } from "../../../types/newRecipe";
import { API_BASE_URL } from "../../../App";

// Rozszerzony typ z polem deletable
export type ExtendedIngredientItem = IngredientItem & {
  deletable: boolean;
};

export type NewUserIngredient = Omit<IngredientItem, "id">;

interface SkladnikiFormProps {
  availCategories: string[];
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

function SkladnikiForm({
  availCategories,
  handlePrevStep,
  handleNextStep,
}: SkladnikiFormProps) {
  const [userIngredients, setUserIngredients] = useState<ExtendedIngredientItem[]>([]);
  const [localNewIngredients, setLocalNewIngredients] = useState<
    NewUserIngredient[]
  >([]);
  const [editingIds, setEditingIds] = useState<Set<number>>(new Set());
  const [editingNewIds, setEditingNewIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Funkcja do pobierania tokenu
  const getToken = () => localStorage.getItem("token");

  // Pobierz składniki użytkownika przy montowaniu komponentu
  useEffect(() => {
    const fetchUserIngredients = async () => {
      try {
        setInitialLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/ingredients/user`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Nie udało się pobrać składników użytkownika");
        }

        const data = await response.json();
        setUserIngredients(data);
      } catch (error) {
        console.error("Błąd ładowania składników użytkownika:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Wystąpił błąd podczas ładowania składników użytkownika"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUserIngredients();
  }, []);

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

  // Usunięcie składnika użytkownika z API
  const removeUserIngredient = async (id: number) => {
    const ingredient = userIngredients.find((ing) => ing.id === id);

    if (!ingredient?.deletable) {
      setError("Nie można usunąć składnika, który jest używany w przepisach");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/ingredients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Nie udało się usunąć składnika");
      }

      // Usuń z lokalnego stanu
      setUserIngredients((prev) => prev.filter((ing) => ing.id !== id));
      setEditingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error("Błąd usuwania składnika:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas usuwania składnika"
      );
    } finally {
      setLoading(false);
    }
  };

  // Usunięcie nowego składnika (tylko lokalnie)
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
    setUserIngredients((prev) =>
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

  // Zapisanie zmian składnika użytkownika do API
  const saveUserIngredient = async (ingredient: ExtendedIngredientItem) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/ingredients/${ingredient.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: ingredient.category,
            title: ingredient.title,
            unit: ingredient.unit,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Nie udało się zaktualizować składnika"
        );
      }

      const updatedIngredient = await response.json();

      // Aktualizuj lokalny stan z odpowiedzią z serwera
      setUserIngredients((prev) =>
        prev.map((ing) =>
          ing.id === ingredient.id
            ? { ...updatedIngredient, deletable: ing.deletable }
            : ing
        )
      );
    } catch (error) {
      console.error("Błąd zapisywania składnika:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas zapisywania składnika"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Przełączenie trybu edycji dla składnika użytkownika
  const toggleEditUser = async (id: number) => {
    const isCurrentlyEditing = editingIds.has(id);

    if (isCurrentlyEditing) {
      // Zapisuj zmiany
      const ingredient = userIngredients.find((ing) => ing.id === id);
      if (ingredient) {
        try {
          await saveUserIngredient(ingredient);
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        } catch (error) {
          // Błąd już obsłużony w saveUserIngredient
          return;
        }
      }
    } else {
      // Włącz tryb edycji
      setEditingIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    }
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

  // Zapisanie wszystkich nowych składników do API
  const saveNewIngredients = async () => {
    if (localNewIngredients.length === 0) return;

    // Walidacja - sprawdź czy wszystkie nowe składniki są kompletne
    const incompleteIngredients = localNewIngredients.filter(
      (ing) => !ing.title || !ing.category || !ing.unit
    );

    if (incompleteIngredients.length > 0) {
      setError("Wszystkie nowe składniki muszą mieć wypełnione wszystkie pola");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/ingredients/add-multiple`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: localNewIngredients,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Nie udało się dodać składników");
      }

      const result = await response.json();
      console.log("Nowe składniki dodane pomyślnie:", result);

      // Wyczyść nowe składniki po pomyślnym dodaniu
      setLocalNewIngredients([]);
      setEditingNewIds(new Set());
    } catch (error) {
      console.error("Błąd dodawania składników:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas dodawania składników"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Obsługa przejścia do następnego kroku
  const handleNextStepWithSave = async () => {
    try {
      setError("");

      // Zapisz wszystkie nowe składniki
      await saveNewIngredients();

      console.log("Składniki użytkownika zaktualizowane:", userIngredients);
      console.log("Nowe składniki dodane:", localNewIngredients);

      handleNextStep();
    } catch (error) {
      // Błąd już obsłużony w saveNewIngredients
      return;
    }
  };

  const ingredients = [
    ...(userIngredients as NewUserIngredient[]),
    ...localNewIngredients,
  ];

  // Wyświetl ładowanie podczas inicjalnego pobierania danych
  if (initialLoading) {
    return (
      <div className="space-y-6 text-gray-600">
        <h2 className="text-2xl font-bold mb-6">Składniki</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <span className="text-blue-700">Ładowanie składników...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Składniki</h2>

      {/* Komunikat o błędzie */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={20} />
          <span className="text-red-700">{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Wskaźnik ładowania */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <span className="text-blue-700">Zapisywanie zmian...</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Składniki użytkownika */}
        {userIngredients.map((ingredient) => {
          const isEditing = editingIds.has(ingredient.id);
          return (
            <div
              key={`user-${ingredient.id}`}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    {ingredient.title || "Składnik użytkownika"}
                  </h3>
                  {!ingredient.deletable && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      Używany w przepisach
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleEditUser(ingredient.id)}
                    disabled={loading}
                    className="text-blue-500 hover:text-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeUserIngredient(ingredient.id)}
                    disabled={loading || !ingredient.deletable}
                    className={`transition-colors ${
                      ingredient.deletable
                        ? "text-red-500 hover:text-red-700"
                        : "text-gray-400 cursor-not-allowed"
                    } disabled:opacity-50`}
                    title={
                      !ingredient.deletable
                        ? "Składnik jest używany w przepisach"
                        : "Usuń składnik"
                    }
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
        disabled={loading}
        className="btn flex items-center disabled:opacity-50"
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
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
        >
          <ArrowLeftIcon size={16} />
          Wstecz
        </button>
        <button
          onClick={handleNextStepWithSave}
          disabled={loading}
          className="btn flex items-center disabled:opacity-50"
        >
          Dalej
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

export default SkladnikiForm;