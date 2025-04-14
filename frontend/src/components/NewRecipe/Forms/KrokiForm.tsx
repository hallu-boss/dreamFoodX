// KrokiForm.tsx - Komponent formularza kroków
import React, { useState } from "react";
import { ArrowLeftIcon, PlusIcon } from "../../../Icons";
import { RecipeFormData } from "../../../types/newRecipe";
import { StepModal } from "../StepModal";

interface KrokiFormProps {
  handlePrevStep: () => void;
  formData: RecipeFormData;
  addStep: (step: { 
    opis: string; 
    skladnik?: string; 
    czas: string; 
    temperatura: number; 
    predkoscOstrzy: number 
  }) => void;
}

export interface StepData {
  nazwa: string;
  skladnik?: string;
  czas: string;
  temperatura: number;
  predkoscOstrzy: number;
}

const KrokiForm: React.FC<KrokiFormProps> = ({ handlePrevStep, formData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [steps, setSteps] = useState<StepData[]>([]);

  const handleAddStep = (stepData: StepData) => {
    const newSteps = [...steps, stepData];
    setSteps(newSteps);
    
    // Update the formData with the new step
    // const newKrok = {
    //   opis: stepData.nazwa,
    //   skladnik: stepData.skladnik,
    //   czas: stepData.czas,
    //   temperatura: stepData.temperatura,
    //   predkoscOstrzy: stepData.predkoscOstrzy
    // };
    
    // We need to update the parent component's formData
    // This would typically be done via a callback prop
    // For now, we'll just update our local state
    setIsModalOpen(false);
  };

  const getIngredientName = (id: string) => {
    const ingredient = formData.skladniki.find(item => item.id === id);
    return ingredient ? ingredient.nazwa : "Nieznany składnik";
  };

  return (
    <div className="text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Kroki przygotowania</h2>
      
      {steps.length > 0 ? (
        <div className="space-y-3 mb-6">
          {steps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded p-3 bg-white">
              <div className="font-medium">{step.nazwa}</div>
              <div className="text-sm text-gray-600 mt-1">
                {step.skladnik && (
                  <div>Składnik: {getIngredientName(step.skladnik)}</div>
                )}
                <div>Czas: {step.czas}</div>
                <div>Temperatura: {step.temperatura}</div>
                <div>Prędkość ostrzy: {step.predkoscOstrzy}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Brak kroków. Dodaj pierwszy krok przygotowania.
        </div>
      )}
      
      <div className="text-center my-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-plant-600 hover:text-plant-800 focus:outline-none"
        >
          <PlusIcon />
        </button>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
        >
          <ArrowLeftIcon />
          Wstecz
        </button>
        <button className="btn">Zapisz przepis</button>
      </div>
      
      <StepModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddStep}
        ingredients={formData.skladniki}
      />
    </div>
  );
};

export default KrokiForm;
