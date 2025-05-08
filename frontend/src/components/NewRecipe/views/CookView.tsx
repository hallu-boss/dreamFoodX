import { NewRecipeStep } from "../../../pages/NewRecipe";
import { RangeSlider } from "../../RangeSlider";

interface CookViewParams {
  cookingStep: NewRecipeStep;
  setCookingStep: React.Dispatch<React.SetStateAction<NewRecipeStep>>
}

export function CookView({ cookingStep, setCookingStep }: CookViewParams) {
  return (
    <>
      {/* Czas */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Czas (min:s)
        </label>
        <input
          type="text"
          name="czas"
          value={cookingStep.time}
          onChange={(e) =>
            setCookingStep({
              ...cookingStep, time: e.target.value
            })}
          pattern="\d{1,2}:\d{2}"
          placeholder="00:00"
          className="w-full p-2 border rounded"
          required
        />
        <small className="text-gray-500">Format: mm:ss (np. 05:30)</small>
      </div>

      {/* Suwaki temperatura */}
      <div className="mb-4">
        <RangeSlider
          label="Temperatura"
          min={1}
          max={5}
          value={cookingStep.temperature ? cookingStep.temperature : 0}
          onChange={(val) =>
            setCookingStep({ ...cookingStep, temperature: val })
          }
          valueLabels={{
            1: "Bardzo niska",
            2: "Niska",
            3: "Średnia",
            4: "Wysoka",
            5: "Bardzo wysoka",
          }}
          startLabel="Bardzo niska"
          endLabel="Bardzo wysoka"
        />
      </div>

      {/* Suwaki prędkość ostrzy */}
      <div className="mb-6">
        <RangeSlider
          label="Prędkość ostrzy"
          min={1}
          max={5}
          value={cookingStep.mixSpeed ? cookingStep.mixSpeed : 0}
          onChange={(val) =>
            setCookingStep({ ...cookingStep, mixSpeed: val })
          }
          valueLabels={{
            1: "Bardzo wolno",
            2: "Wolno",
            3: "Średnio",
            4: "Szybko",
            5: "Bardzo szybko",
          }}
          startLabel="Bardzo wolno"
          endLabel="Bardzo szybko"
        />
      </div>
    </>
  )
}
