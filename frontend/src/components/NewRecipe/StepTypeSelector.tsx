import { RecipeStep } from "../../types/recipe/recipe";

export interface StepTypeOption {
  value: RecipeStep["stepType"];
  label: string;
}

interface StepTypeSelectorParams {
  selected: string;
  onChange: (value: RecipeStep["stepType"]) => void;
  options: StepTypeOption[];
}

export function StepTypeSelector({ selected, onChange, options }: StepTypeSelectorParams) {
  return (
    <div className="mb-4 flex space-x-6">
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            name="stepType"
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="mr-2"
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
