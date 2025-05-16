import { NewRecipeStep } from "../../../pages/NewRecipe";

interface DecriptionViewParams {
  descriptionStep: NewRecipeStep;
  setDescriptionStep: React.Dispatch<React.SetStateAction<NewRecipeStep>>;
}

export function DecriptionView({ descriptionStep, setDescriptionStep }: DecriptionViewParams) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Opis kroku
      </label>
      <textarea
        name="opis"
        value={descriptionStep.description}
        onChange={(e) =>
          setDescriptionStep({
            ...descriptionStep, description: e.target.value
          })}
        rows={4}
        className="w-full p-2 border rounded"
        placeholder="Opisz, co należy zrobić w tym kroku..."
        required
      />
    </div>
  )
}
