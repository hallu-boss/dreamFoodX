import React, { useState } from "react";
import { IngredientItem } from "../../types/newRecipe";
import { StepTypeOption, StepTypeSelector } from "./StepTypeSelector.tsx";
import { AddIngredientView } from "./views/AddIngredientView.tsx";
import { CookView } from "./views/CookView.tsx";
import { DecriptionView } from "./views/DescriptionView.tsx";
import { NewRecipeStep } from "../../pages/NewRecipe.tsx";

interface StepModalProps {
  availIngredients: IngredientItem[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (stepData: NewRecipeStep) => void; // ← ZMIANA: dodano stepType do onSave
}

export const StepModal: React.FC<StepModalProps> = ({
  availIngredients,
  isOpen,
  onClose,
  onSave,
}) => {
  const [stepData, setStepData] = useState<NewRecipeStep>({
    title: "",
    stepType: "ADD_INGREDIENT",
    ingredientId: -1,
    amount: 0,
  });

  const stepTypeOptions: StepTypeOption[] = [
    { value: "ADD_INGREDIENT", label: "Dodaj składnik" },
    { value: "COOKING", label: "Gotuj" },
    { value: "DESCRIPTION", label: "Tekst" },
  ]

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const handleRadioChange = (value: NewRecipeStep["stepType"]) => {
    switch (value) {
      case "ADD_INGREDIENT":
        setStepData({
          title: stepData.title,
          stepType: "ADD_INGREDIENT",
          ingredientId: -1,
          amount: 0
        });
        break;
      case "COOKING":
        setStepData({
          title: stepData.title,
          stepType: "COOKING",
          time: "00:00",
          temperature: 3,
          mixSpeed: 3,
        });
        break;
      case "DESCRIPTION":
        setStepData({
          title: stepData.title,
          stepType: "DESCRIPTION",
          description: "",
        });
        break;
    }
    console.log(stepData)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let stepToSave: NewRecipeStep;

    switch (stepData.stepType) {
      case "ADD_INGREDIENT":
        stepToSave = {
          title: stepData.title,
          stepType: "ADD_INGREDIENT",
          ingredientId: stepData.ingredientId,
          amount: stepData.amount,
        };
        break;
      case "COOKING":
        stepToSave = {
          title: stepData.title,
          stepType: "COOKING",
          time: stepData.time,
          temperature: stepData.temperature,
          mixSpeed: stepData.mixSpeed,
        };
        break;
      case "DESCRIPTION":
        stepToSave = {
          title: stepData.title,
          stepType: "DESCRIPTION",
          description: stepData.description,
        };
        break;
    }

    onSave(stepToSave);
    setStepData({
      title: "",
      stepType: "ADD_INGREDIENT",
      ingredientId: -1,
      amount: 0,
    });
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
              name="title"
              value={stepData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <StepTypeSelector
            selected={stepData.stepType}
            onChange={handleRadioChange}
            options={stepTypeOptions}
          />

          {stepData.stepType === 'ADD_INGREDIENT' && (
            <AddIngredientView
              ingredients={availIngredients}
              addIngredientStep={stepData}
              setAddIngredientStep={setStepData}
            />
          )}

          {stepData.stepType === 'COOKING' && (
            <CookView
              cookingStep={stepData}
              setCookingStep={setStepData}
            />
          )}

          {stepData.stepType === 'DESCRIPTION' && (
            <DecriptionView
              descriptionStep={stepData}
              setDescriptionStep={setStepData}
            />
          )}

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
