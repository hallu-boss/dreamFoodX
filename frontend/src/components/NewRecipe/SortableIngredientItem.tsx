import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IngredientItem } from "../../types/newRecipe";
import { availableIngredients } from "../../data/newRecipe";
import { GripVertical, Trash2 } from "lucide-react";
import Dropdown from "../Dropdown";

interface SortableIngredientItemProps {
  ingredient: IngredientItem;
  onChange: (id: string, field: keyof IngredientItem, value: string) => void;
  onRemove: (id: string) => void;
}

const SortableIngredientItem: React.FC<SortableIngredientItemProps> = ({
  ingredient,
  onChange,
  onRemove,
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

  // Przygotuj opcje dla komponentu Dropdown
  const ingredientOptions = availableIngredients.map(item => ({
    value: item.id, // Użyj ID jako wartości
    label: item.nazwa, // Użyj nazwy jako etykiety
  }));

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-2 border border-gray-200 rounded p-2 bg-white"
    >
      {/* Uchwyt */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-move text-gray-400 px-1 touch-none"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <Dropdown
        value={ingredient.nazwa}
        onChange={(selectedValue) => onChange(ingredient.id, 'nazwa', String(selectedValue))}
        options={ingredientOptions}
        placeholder="Wybierz składnik"
        className="flex-grow" 
      />

      {/* Input ilości */}
      <input
        type="number"
        value={ingredient.ilosc}
        onChange={(e) =>
          onChange(ingredient.id, 'ilosc', e.target.value)
        }
        min="0"
        placeholder="Ilość"
        className="w-24 custom-select"
      />

      {/* Przycisk usuwania */}
      <button
        onClick={() => onRemove(ingredient.id)}
        className="p-1 rounded text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors"
        title="Usuń składnik"
        aria-label="Usuń składnik"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SortableIngredientItem;
