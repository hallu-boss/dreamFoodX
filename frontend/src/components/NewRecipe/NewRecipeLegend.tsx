// StepsNavigation.tsx - Nawigacja po krokach
import React from "react";
import { RecipeFormStep } from "../../types/newRecipe";
import { formSteps } from "../../data/newRecipe";

interface StepsNavigationProps {
  currentStep: RecipeFormStep;
  setCurrentStep: (step: RecipeFormStep) => void;
}

const NewRecipeLegend: React.FC<StepsNavigationProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-plant-600 font-medium mb-4">
        Tworzenie przepisu
      </h3>
      <ul className="space-y-2">
        {formSteps.map((step) => (
          <li
            key={step.id}
            className={`py-2 px-3 rounded cursor-pointer ${
              currentStep === step.id
                ? "bg-plant-50 text-plant-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            {step.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewRecipeLegend;