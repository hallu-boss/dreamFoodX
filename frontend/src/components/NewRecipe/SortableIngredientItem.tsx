import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IngredientItem } from "../../types/newRecipe";
import { availableIngredients } from "../../data/newRecipe";
import { DragHandleIcon, TrashIcon } from "../../Icons";

interface SortableIngredientItemProps {
  ingredient: IngredientItem;
  onChange: (id: string, field: keyof IngredientItem, value: string) => void;
  onRemove: (id: string) => void;
}

const SortableIngredientItem: React.FC<SortableIngredientItemProps> = ({ 
  ingredient, 
  onChange, 
  onRemove 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: ingredient.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-2 border border-gray-200 rounded p-2 bg-white"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move text-gray-400 px-1"
      >
        <DragHandleIcon />
      </div>

      <div className="flex-grow relative">
        <select
          value={ingredient.nazwa}
          onChange={(e) =>
            onChange(ingredient.id, "nazwa", e.target.value)
          }
          className="w-full p-2 border rounded bg-gray-50 appearance-none pr-8"
        >
          <option value="">Wybierz składnik</option>
          {availableIngredients.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nazwa}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          ▼
        </div>
      </div>

      <input
        type="number"
        value={ingredient.ilosc}
        onChange={(e) =>
          onChange(ingredient.id, "ilosc", e.target.value)
        }
        min="0"
        placeholder="Ilość"
        className="w-24 p-2 border rounded bg-gray-50"
      />

      <button
        onClick={() => onRemove(ingredient.id)}
        className="text-gray-500 hover:text-red-500 p-1"
        title="Usuń składnik"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default SortableIngredientItem;