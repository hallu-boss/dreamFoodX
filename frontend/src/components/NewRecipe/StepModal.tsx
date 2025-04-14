import React, { useState } from "react";
import { IngredientItem } from "../../types/newRecipe";
import { StepData } from "./Forms/KrokiForm";
import { RangeSlider } from "../RangeSlider";

interface StepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stepData: StepData) => void;
  ingredients: IngredientItem[];
}

export const StepModal: React.FC<StepModalProps> = ({
  isOpen,
  onClose,
  onSave,
  ingredients,
}) => {
  const [stepData, setStepData] = useState<StepData>({
    nazwa: "",
    skladnik: "",
    czas: "00:00",
    temperatura: 3,
    predkoscOstrzy: 3,
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(stepData);
    setStepData({
      nazwa: "",
      skladnik: "",
      czas: "00:00",
      temperatura: 3,
      predkoscOstrzy: 3,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-600 p-6 rounded-lg shadow-lg w-full max-w-[90%]">
        <h3 className="text-xl font-bold mb-4">Dodaj nowy krok</h3>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Składnik
            </label>
            <select
              name="skladnik"
              value={stepData.skladnik}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 appearance-none"
            >
              <option value="">Wybierz składnik</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.nazwa}
                </option>
              ))}
            </select>
          </div>

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
