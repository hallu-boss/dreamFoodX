// KrokiForm.tsx - Komponent formularza kroków
import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon } from '../../../Icons';
import { IngredientItem } from '../../../types/newRecipe';
import { StepModal } from '../StepModal';
import RecipeStepCard from '../RecipeStepCard';
import { NewRecipeStep } from '../../../pages/NewRecipe';

interface KrokiFormProps {
  handlePrevStep: () => void;
  handleFinish: () => void;
  stepsList: NewRecipeStep[];
  ingredientsList: IngredientItem[];
  addStep: (step: Omit<NewRecipeStep, 'id'>) => void;
  removeStep: (stepId: string) => void;
  getIngredientName: (id: number) => string;
  isLoading?: boolean;
}

const KrokiForm: React.FC<KrokiFormProps> = ({
  handlePrevStep,
  handleFinish,
  stepsList,
  ingredientsList,
  addStep,
  removeStep,
  getIngredientName,
  isLoading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStep = (stepData: Omit<NewRecipeStep, 'id'>) => {
    addStep(stepData);
    setIsModalOpen(false);
  };

  return (
    <div className="text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Kroki przygotowania</h2>

      {stepsList.length > 0 ? (
        <div className="space-y-4 mb-6">
          {stepsList.map((step, index) => (
            <RecipeStepCard
              key={step.id}
              step={step}
              stepNumber={index + 1}
              getIngredientName={getIngredientName}
              onRemove={() => removeStep(step.id)}
              id={step.id}
              isDisabled={isLoading}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-lg mb-2">Brak kroków przygotowania</div>
          <div className="text-sm">Dodaj pierwszy krok, aby rozpocząć</div>
        </div>
      )}

      <div className="text-center my-6">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all duration-200 ${
            isLoading
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-plant-300 text-plant-600 hover:border-plant-400 hover:text-plant-700 hover:bg-plant-50'
          }`}
        >
          <PlusIcon />
          Dodaj krok
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          disabled={isLoading}
          className={`px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 transition-all duration-200 ${
            isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'hover:bg-gray-100 text-gray-700 hover:border-gray-400'
          }`}
        >
          <ArrowLeftIcon />
          Wstecz
        </button>

        <button
          onClick={handleFinish}
          disabled={isLoading || stepsList.length === 0}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
            isLoading || stepsList.length === 0
              ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
              : 'bg-plant-600 text-white hover:bg-plant-700 shadow-sm hover:shadow-md'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Zapisywanie...
            </div>
          ) : (
            'Zapisz przepis'
          )}
        </button>
      </div>

      <StepModal
        availIngredients={ingredientsList}
        isOpen={isModalOpen && !isLoading}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddStep}
      />
    </div>
  );
};

export default KrokiForm;
