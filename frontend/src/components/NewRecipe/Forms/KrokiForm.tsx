// KrokiForm.tsx - Komponent formularza kroków
import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon } from '../../../Icons';
import { IngredientItem } from '../../../types/newRecipe';
import { StepModal } from '../StepModal';
import RecipeStepCard from '../RecipeStepCard';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { NewRecipeStep } from '../../../pages/NewRecipe';

interface KrokiFormProps {
  handlePrevStep: () => void;
  handleFinish: () => void;
  stepsList: NewRecipeStep[];
  ingredientsList: IngredientItem[];
  addStep: (step: NewRecipeStep) => void;
  updateStepsList: (newSteps: NewRecipeStep[]) => void;
  isLoading?: boolean;
}

const KrokiForm: React.FC<KrokiFormProps> = ({
  handlePrevStep,
  handleFinish,
  stepsList,
  ingredientsList,
  addStep,
  updateStepsList,
  isLoading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Konfiguracja sensorów dla dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddStep = (stepData: NewRecipeStep) => {
    addStep(stepData);
    setIsModalOpen(false);
  };

  const getIngredientName = (id: number) => {
    const ingredient = ingredientsList.find((item) => item.id == id);
    return ingredient ? ingredient.title : 'Nieznany składnik';
  };

  // Obsługa zakończenia przeciągania
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = stepsList.findIndex(
        (_, index) => `step-${index}` === active.id
      );
      const newIndex = stepsList.findIndex(
        (_, index) => `step-${index}` === over.id
      );

      console.log(`old: ${oldIndex}, new: ${newIndex}`);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newStepsList = arrayMove(stepsList, oldIndex, newIndex);
        updateStepsList(newStepsList);
      }
    }
  };

  return (
    <div className="text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Kroki przygotowania</h2>

      {stepsList.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={stepsList.map((_, index) => `step-${index}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3 mb-6">
              {stepsList.map((step, index) => (
                <RecipeStepCard
                  key={`step-${index}`}
                  step={step}
                  getIngredientName={getIngredientName}
                  id={`step-${index}`}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Brak kroków. Dodaj pierwszy krok przygotowania.
        </div>
      )}

      <div className="text-center my-4">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
          className={`p-2 focus:outline-none transition-colors duration-200 ${
            isLoading
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-plant-600 hover:text-plant-800'
          }`}
        >
          <PlusIcon />
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          disabled={isLoading}
          className={`px-2 py-1 border border-gray-300 rounded flex items-center transition-colors duration-200 ${
            isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <ArrowLeftIcon />
          Wstecz
        </button>

        <button
          onClick={handleFinish}
          disabled={isLoading || stepsList.length === 0}
          className={`btn transition-all duration-200 ${
            isLoading || stepsList.length === 0
              ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
              : 'hover:bg-plant-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
