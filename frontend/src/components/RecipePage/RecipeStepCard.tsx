import { RecipeStep } from "../../pages/RecipePage"

interface RecipeStepCardParams {
  step: RecipeStep
}

export function RecipeStepCard({ step }: RecipeStepCardParams) {
  return (
    <div className="border border-plant-700 p-4 rounded-md bg-white">
      <p>{step.title}</p>
    </div>
  )
}
