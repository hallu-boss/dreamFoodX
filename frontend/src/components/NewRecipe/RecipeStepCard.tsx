import { StepData } from "../../types/newRecipe";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

interface RecipeStepCardProps {
  step: StepData;
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
      <div className="font-medium">{step.nazwa}</div>
      <div className="text-sm text-gray-600 mt-1 space-y-1">
        {step.stepType === "add" && (
          <>
            {step.skladnik && (
              <div>Składnik: {getIngredientName(step.skladnik)}</div>
            )}
            {step.ilosc && <div>Ilość: {step.ilosc}</div>}
          </>
        )}
        {step.stepType === "cook" && (
          <>
            <div>Czas: {step.czas}</div>
            <div>Temperatura: {step.temperatura}°C</div>
            <div>Prędkość ostrzy: {step.predkoscOstrzy}</div>
          </>
        )}
        {step.stepType === "text" && <div>Opis: {step.opis}</div>}
      </div>
    </div>
  )
}

export default RecipeStepCard;
