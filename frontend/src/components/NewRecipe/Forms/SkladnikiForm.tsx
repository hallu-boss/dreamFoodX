import React from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';

import { RecipeFormData, IngredientItem } from "../../../types/newRecipe";
import SortableIngredientItem from "../SortableIngredientItem";

interface SkladnikiFormProps {
  formData: RecipeFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sensors: any;
  handleIngredientChange: (
    id: string,
    field: keyof IngredientItem,
    value: string
  ) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

const SkladnikiForm: React.FC<SkladnikiFormProps> = ({
  formData,
  sensors,
  handleIngredientChange,
  handleDragEnd,
  addIngredient,
  removeIngredient,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div className="text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Składniki</h2>

      <div className="mb-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={formData.skladniki.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {formData.skladniki.map((ingredient) => (
                <SortableIngredientItem
                  key={ingredient.id}
                  ingredient={ingredient}
                  onChange={handleIngredientChange}
                  onRemove={removeIngredient}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="text-center my-4">
          <button
            onClick={addIngredient}
            className="p-2 text-plant-600 hover:text-plant-800 focus:outline-none"
            aria-label="Dodaj składnik"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Wstecz
        </button>
        <button onClick={handleNextStep} className="btn flex items-center">
          Dalej
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SkladnikiForm;
