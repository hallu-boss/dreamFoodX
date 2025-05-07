import React, { useState, useEffect } from "react";
import { IngredientItem } from "../../types/newRecipe";
import { StepData } from "../../types/newRecipe";
import { RangeSlider } from "../RangeSlider";

interface StepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stepData: StepData) => void; // ← ZMIANA: dodano stepType do onSave
}

export const StepModal: React.FC<StepModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [allIngredients, setAllIngredients] = useState<IngredientItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stepData, setStepData] = useState<StepData>({ // ← ZMIANA: dodano ilosc
    nazwa: "",
    stepType: "add",
    skladnik: -1,
    ilosc: "",
    czas: "00:00",
    temperatura: 3,
    predkoscOstrzy: 3,
    opis: ""
  });

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/api/ingredients/all")
        .then((res) => res.json())
        .then((data) => setAllIngredients(data))
        .catch((err) => console.error("Błąd ładowania składników:", err));
    }
  }, [isOpen]);

  const categories = Array.from(
    new Set(allIngredients.map((ing) => ing.category))
  );

  const filteredIngredients = selectedCategory
    ? allIngredients.filter((ing) => ing.category === selectedCategory)
    : [];

  const selectedIngredient = allIngredients.find(
    (ing) => ing.id == stepData.skladnik
  );
  const unit = selectedIngredient?.unit || "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => { // ← ZMIANA: obsługa wyboru typu kroku
    setStepData({
      ...stepData,
      stepType: e.target.value,
      skladnik: -1,
      ilosc: "",
      czas: "00:00",
      temperatura: 3,
      predkoscOstrzy: 3,
    });
    setSelectedCategory("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...stepData }); // ← ZMIANA: przekazanie stepType w zapisie
    setStepData({
      nazwa: "",
      stepType: "",
      skladnik: -1,
      ilosc: "",
      czas: "00:00",
      temperatura: 3,
      predkoscOstrzy: 3,
      opis: ""
    });
    setSelectedCategory("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-600 p-6 rounded-lg shadow-lg w-full max-w-[90%]">
        <h3 className="text-xl font-bold mb-4">Dodaj nowy krok</h3>

        <form onSubmit={handleSubmit}>
          {/* Nazwa kroku */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa kroku
            </label>
            <input
              type="text"
              name="nazwa"
              value={stepData.nazwa}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* ← ZMIANA: radio buttons dla typu kroku */}
          <div className="mb-4 flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="stepType"
                value="add"
                checked={stepData.stepType === "add"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Dodaj składnik
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="stepType"
                value="cook"
                checked={stepData.stepType === "cook"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Gotuj
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="stepType"
                value="text"
                checked={stepData.stepType === "text"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Tekst
            </label>
          </div>

          {/* ← ZMIANA: wiersz do Dodaj składnik */}
          {stepData.stepType === "add" && (
            <div className="mb-4 flex space-x-4">
              {/* Kategoria składnika */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategoria składnika
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setStepData({ ...stepData, skladnik: -1, ilosc: "" });
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

              {/* Nazwa składnika */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Składnik
                </label>
                <select
                  name="skladnik"
                  value={stepData.skladnik}
                  onChange={handleChange}
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

              {/* Ilość */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ilość {unit ? `[${unit}]` : ''}
                </label>
                <input
                  type="text"
                  name="ilosc"
                  value={stepData.ilosc}
                  onChange={handleChange}
                  pattern="\d*"
                  placeholder="123"
                  className="w-full p-2 border rounded"
                  disabled={!stepData.skladnik}
                  required
                />
              </div>
            </div>
          )}

          {/* ← ZMIANA: pola do Gotuj */}
          {stepData.stepType === "cook" && (
            <>
              {/* Czas */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Czas (min:s)
                </label>
                <input
                  type="text"
                  name="czas"
                  value={stepData.czas}
                  onChange={handleChange}
                  pattern="\d{1,2}:\d{2}"
                  placeholder="00:00"
                  className="w-full p-2 border rounded"
                  required
                />
                <small className="text-gray-500">Format: mm:ss (np. 05:30)</small>
              </div>

              {/* Suwaki temperatura */}
              <div className="mb-4">
                <RangeSlider
                  label="Temperatura"
                  min={1}
                  max={5}
                  value={stepData.temperatura}
                  onChange={(val) =>
                    setStepData({ ...stepData, temperatura: val })
                  }
                  valueLabels={{
                    1: "Bardzo niska",
                    2: "Niska",
                    3: "Średnia",
                    4: "Wysoka",
                    5: "Bardzo wysoka",
                  }}
                  startLabel="Bardzo niska"
                  endLabel="Bardzo wysoka"
                />
              </div>

              {/* Suwaki prędkość ostrzy */}
              <div className="mb-6">
                <RangeSlider
                  label="Prędkość ostrzy"
                  min={1}
                  max={5}
                  value={stepData.predkoscOstrzy}
                  onChange={(val) =>
                    setStepData({ ...stepData, predkoscOstrzy: val })
                  }
                  valueLabels={{
                    1: "Bardzo wolno",
                    2: "Wolno",
                    3: "Średnio",
                    4: "Szybko",
                    5: "Bardzo szybko",
                  }}
                  startLabel="Bardzo wolno"
                  endLabel="Bardzo szybko"
                />
              </div>
            </>
          )}

          {stepData.stepType === "text" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opis kroku
              </label>
              <textarea
                name="opis"
                value={stepData.opis}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded"
                placeholder="Opisz, co należy zrobić w tym kroku..."
                required
              />
            </div>
          )}

          {/* Przyciski */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              Anuluj
            </button>
            <button type="submit" className="btn">
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
