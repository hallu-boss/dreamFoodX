import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { NewRecipeStep } from "../../pages/NewRecipe";

interface RecipeStepCardProps {
  step: NewRecipeStep;
  getIngredientName: (id: number) => string
  id: string;
}
function RecipeStepCard({ step, getIngredientName, id }: RecipeStepCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (

    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded p-3 bg-white"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600 mt-1"
      >
        <GripVertical size={20} />
      </div>
      <div className="font-medium">{step.title}</div>
      <div className="text-sm text-gray-600 mt-1 space-y-1">
        {step.stepType === 'ADD_INGREDIENT' && (
          <>
            {step.ingredientId && (
              <div>Składnik: {getIngredientName(step.ingredientId)}</div>
            )}
            {step.amount && <div>Ilość: {step.amount}</div>}
          </>
        )}
        {step.stepType === 'COOKING' && (
          <>
            <div>Czas: {step.time}</div>
            <div>Temperatura: {step.temperature}</div>
            <div>Prędkość ostrzy: {step.mixSpeed}</div>
          </>
        )}
        {step.stepType === "DESCRIPTION" && <div>Opis: {step.description}</div>}
      </div>
    </div>
  )
}

export default RecipeStepCard;
