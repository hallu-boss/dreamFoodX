// KrokiForm.tsx - Komponent formularza kroków
import React, { useState } from "react";
import { ArrowLeftIcon, PlusIcon } from "../../../Icons";
import { IngredientItem } from "../../../types/newRecipe";
import { StepModal } from "../StepModal";
import RecipeStepCard from "../RecipeStepCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { NewRecipeStep } from "../../../pages/NewRecipe";

interface KrokiFormProps {
  handlePrevStep: () => void;
  handleFinish: () => void;
  stepsList: NewRecipeStep[];
  ingredientsList: IngredientItem[];
  addStep: (step: NewRecipeStep) => void;
  updateStepsList: (newSteps: NewRecipeStep[]) => void;
}

const KrokiForm: React.FC<KrokiFormProps> = ({
  handlePrevStep,
  handleFinish,
  stepsList,
  ingredientsList,
  addStep,
  updateStepsList
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
    const ingredient = ingredientsList.find(item => item.id == id);
    return ingredient ? ingredient.title : "Nieznany składnik";
  };

  // Obsługa zakończenia przeciągania
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = stepsList.findIndex((_, index) => `step-${index}` === active.id);
      const newIndex = stepsList.findIndex((_, index) => `step-${index}` === over.id);

      console.log(`old: ${oldIndex}, new: ${newIndex}`)

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
          className="p-2 text-plant-600 hover:text-plant-800 focus:outline-none"
        >
          <PlusIcon />
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
        >
          <ArrowLeftIcon />
          Wstecz
        </button>
        <button
          onClick={handleFinish}
          className="btn">Zapisz przepis</button>
      </div>

      <StepModal
        availIngredients={ingredientsList}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddStep}
      />
    </div>
  );
};

export default KrokiForm;
