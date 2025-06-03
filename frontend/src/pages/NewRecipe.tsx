// NewRecipe.tsx - Główny komponent przepisu
import React, { useEffect, useState } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { RecipeFormStep, IngredientItem } from "../types/newRecipe";
import NewRecipeLegend from "../components/NewRecipe/NewRecipeLegend";
import InformacjeForm from "../components/NewRecipe/Forms/InformacjeForm"
import SkladnikiForm from "../components/NewRecipe/Forms/SkladnikiForm";
import KrokiForm from "../components/NewRecipe/Forms/KrokiForm";
import { API_BASE_URL } from "../App";

export interface NewRecipeStep {
  title: string;
  stepType: 'ADD_INGREDIENT' | 'COOKING' | 'DESCRIPTION';

  ingredientId?: number;
  amount?: number;

  time?: string;
  temperature?: number;
  mixSpeed?: number;

  description?: string;
}

export interface NewRecipeInfo {
  title: string;
  description: string;
  category: string;
  price: number;
  steps: NewRecipeStep[];
}

const NewRecipe: React.FC = () => {
  // Stan aktualnego kroku formularza
  const [currentStep, setCurrentStep] = useState<RecipeFormStep>("informacje");

  // Stan danych formularza
  const [formData, setFormData] = useState<NewRecipeInfo>({
    title: "",
    description: "",
    category: "",
    price: 0.0,
    steps: [],
  });
  
  // Osobny stan dla obrazka
  const [recipeImage, setRecipeImage] = useState<File | null>(null);

  const [allIngredients, setAllIngredients] = useState<IngredientItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/ingredients/all`)
      .then((res) => res.json())
      .then((data) => setAllIngredients(data))
      .catch((err) => console.error("Błąd ładowania składników:", err));
  }, [])

  // Konfiguracja sensorów dla dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Obsługa zmiany wartości w formularzu
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle file input separately
    if (type === 'iamge') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setRecipeImage(fileInput.files[0]);
      }
      return;
    }
    
    const numVal = name === "price" ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: numVal });
  };

  async function handleFinish() {
    try {
      // Create FormData for multipart/form-data upload
      const formDataToSend = new FormData();
      
      // Add recipe data as JSON
      const recipeDataJSON = JSON.stringify({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        steps: formData.steps
      });
      
      formDataToSend.append('recipeData', recipeDataJSON);
      
      // Add image file if exists
      if (recipeImage) {
        formDataToSend.append('image', recipeImage);
      }
      
      const response = await fetch(`${API_BASE_URL}/recipe/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Don't set Content-Type here - FormData sets it automatically with boundary
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }
      
      const result = await response.json();
      console.log('Recipe created successfully:', result);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  }

  // Funkcje do obsługi kroków
  const addStep = (step: NewRecipeStep) => {
    setFormData({
      ...formData,
      steps: [...formData.steps, step]
    });
  };

  const updateStepsList = (newSteps: NewRecipeStep[]) => {
    setFormData({
      ...formData,
      steps: newSteps
    });
  };

  // Przejście do następnego kroku
  const handleNextStep = () => {
    if (currentStep === "informacje") setCurrentStep("skladniki");
    else if (currentStep === "skladniki") setCurrentStep("kroki");
  };

  // Przejście do poprzedniego kroku
  const handlePrevStep = () => {
    if (currentStep === "kroki") setCurrentStep("skladniki");
    else if (currentStep === "skladniki") setCurrentStep("informacje");
  };

  // Renderowanie aktualnego kroku formularza
  const renderCurrentStepForm = () => {
    switch (currentStep) {
      case "informacje":
        return ( 
          <InformacjeForm
            formData={formData}
            recipeImage={recipeImage}
            handleRecipeImageChange={(image) => setRecipeImage(image)}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case "skladniki":
        return (
          <SkladnikiForm
            formData={formData}
            sensors={sensors}
            handleIngredientChange={() => { return }}
            handleDragEnd={() => { return }}
            removeIngredient={() => { return }}
            addIngredient={() => { return }}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        );
      case "kroki":
        return <KrokiForm
          handlePrevStep={handlePrevStep}
          handleFinish={handleFinish}
          stepsList={formData.steps}
          ingredientsList={allIngredients}
          addStep={addStep}
          updateStepsList={updateStepsList}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Lewa kolumna - legenda kroków */}
          <div className="md:w-1/4">
            <NewRecipeLegend
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          {/* Prawa kolumna - aktualny formularz */}
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {renderCurrentStepForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;