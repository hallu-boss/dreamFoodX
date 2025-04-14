// KrokiForm.tsx - Komponent formularza kroków
import React, { useState } from "react";
import { ArrowLeftIcon, PlusIcon } from "../../../Icons";
import { RecipeFormData, IngredientItem } from "../../../types/newRecipe";

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

interface StepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stepData: StepData) => void;
  ingredients: IngredientItem[];
}

interface StepData {
  nazwa: string;
  skladnik?: string;
  czas: string;
  temperatura: number;
  predkoscOstrzy: number;
}

const StepModal: React.FC<StepModalProps> = ({ isOpen, onClose, onSave, ingredients }) => {
  const [stepData, setStepData] = useState<StepData>({
    nazwa: "",
    skladnik: "",
    czas: "00:00",
    temperatura: 3,
    predkoscOstrzy: 3,
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "temperatura" | "predkoscOstrzy"
  ) => {
    setStepData({ ...stepData, [field]: parseInt(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(stepData);
    setStepData({
      nazwa: "",
      skladnik: "",
      czas: "00:00",
      temperatura: 3,
      predkoscOstrzy: 3,
    });
  };

  const getTemperatureLabel = (value: number) => {
    switch (value) {
      case 1: return "Bardzo niska";
      case 2: return "Niska";
      case 3: return "Średnia";
      case 4: return "Wysoka";
      case 5: return "Bardzo wysoka";
      default: return "Średnia";
    }
  };

  const getSpeedLabel = (value: number) => {
    switch (value) {
      case 1: return "Bardzo wolno";
      case 2: return "Wolno";
      case 3: return "Średnio";
      case 4: return "Szybko";
      case 5: return "Bardzo szybko";
      default: return "Średnio";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Dodaj nowy krok</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa kroku
            </label>
            <input
              type="text"
              name="nazwa"
              value={stepData.nazwa}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Składnik
            </label>
            <select
              name="skladnik"
              value={stepData.skladnik}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 appearance-none"
            >
              <option value="">Wybierz składnik</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.nazwa}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Czas (min:s)
            </label>
            <input
              type="text"
              name="czas"
              value={stepData.czas}
              onChange={handleChange}
              pattern="\d{1,2}:\d{2}"
              placeholder="00:00"
              className="w-full p-2 border rounded"
              required
            />
            <small className="text-gray-500">Format: mm:ss (np. 05:30)</small>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperatura: {getTemperatureLabel(stepData.temperatura)}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={stepData.temperatura}
              onChange={(e) => handleSliderChange(e, "temperatura")}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Bardzo niska</span>
              <span>Niska</span>
              <span>Średnia</span>
              <span>Wysoka</span>
              <span>Bardzo wysoka</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prędkość ostrzy: {getSpeedLabel(stepData.predkoscOstrzy)}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={stepData.predkoscOstrzy}
              onChange={(e) => handleSliderChange(e, "predkoscOstrzy")}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Bardzo wolno</span>
              <span>Wolno</span>
              <span>Średnio</span>
              <span>Szybko</span>
              <span>Bardzo szybko</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="btn"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
    <div>
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
                <div>Temperatura: {getTemperatureLabel(step.temperatura)}</div>
                <div>Prędkość ostrzy: {getSpeedLabel(step.predkoscOstrzy)}</div>
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
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
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

// Helper functions for labels
const getTemperatureLabel = (value: number) => {
  switch (value) {
    case 1: return "Bardzo niska";
    case 2: return "Niska";
    case 3: return "Średnia";
    case 4: return "Wysoka";
    case 5: return "Bardzo wysoka";
    default: return "Średnia";
  }
};

const getSpeedLabel = (value: number) => {
  switch (value) {
    case 1: return "Bardzo wolno";
    case 2: return "Wolno";
    case 3: return "Średnio";
    case 4: return "Szybko";
    case 5: return "Bardzo szybko";
    default: return "Średnio";
  }
};

export default KrokiForm;
