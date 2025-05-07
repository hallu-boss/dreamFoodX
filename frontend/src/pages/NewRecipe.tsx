// NewRecipe.tsx - Główny komponent przepisu
import React, { useEffect, useState } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { RecipeFormStep, IngredientItem, RecipeFormData, StepData } from "../types/newRecipe";
import NewRecipeLegend from "../components/NewRecipe/NewRecipeLegend";
import InformacjeForm from "../components/NewRecipe/Forms/InformacjeForm"
import SkladnikiForm from "../components/NewRecipe/Forms/SkladnikiForm";
import KrokiForm from "../components/NewRecipe/Forms/KrokiForm";

const NewRecipe: React.FC = () => {
  // Stan aktualnego kroku formularza
  const [currentStep, setCurrentStep] = useState<RecipeFormStep>("informacje");

  // Stan danych formularza
  const [formData, setFormData] = useState<RecipeFormData>({
    nazwa: "",
    opis: "",
    kategoria: "",
    kroki: [],
  });

  const [allIngredients, setAllIngredients] = useState<IngredientItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/ingredients/all")
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funkcje do obsługi kroków
  const addStep = (step: StepData) => {
    setFormData({
      ...formData,
      kroki: [...formData.kroki, step]
    });
  };

  const updateStepsList = (newSteps: StepData[]) => {
    setFormData({
      ...formData,
      kroki: newSteps
    });
  };

  // Funkcje do obsługi składników
  // const addIngredient = () => {
  //   const newIngredient: IngredientItem = {
  //     id: `ingredient-${Date.now()}`,
  //     title: "",
  //     unit: "",
  //     category: "",
  //   };
  //   setFormData({
  //     ...formData,
  //     skladniki: [...formData.skladniki, newIngredient],
  //   });
  // };

  // const removeIngredient = (id: string) => {
  //   setFormData({
  //     ...formData,
  //     skladniki: formData.skladniki.filter((item) => item.id !== id),
  //   });
  // };

  // const handleIngredientChange = (
  //   id: string,
  //   field: keyof IngredientItem,
  //   value: string
  // ) => {
  //   const updatedIngredients = formData.skladniki.map((ingredient) => {
  //     if (ingredient.id === id) {
  //       // Jeśli zmieniamy nazwę składnika, zaktualizuj też domyślną jednostkę
  //       if (field === "title" && value) {
  //         const selectedIngredient = availableIngredients.find(
  //           (item) => item.id === value
  //         );
  //         return {
  //           ...ingredient,
  //           [field]: value,
  //           unit: selectedIngredient?.defaultJednostka || ingredient.unit,
  //         };
  //       }
  //       return { ...ingredient, [field]: value };
  //     }
  //     return ingredient;
  //   });
  //
  //   setFormData({
  //     ...formData,
  //     skladniki: updatedIngredients,
  //   });
  // };

  // Obsługa zakończenia przeciągania dla @dnd-kit
  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //
  //   if (over && active.id !== over.id) {
  //     setFormData((prevData) => {
  //       const oldIndex = prevData.skladniki.findIndex(item => item.id === active.id);
  //       const newIndex = prevData.skladniki.findIndex(item => item.id === over.id);
  //
  //       return {
  //         ...prevData,
  //         skladniki: arrayMove(prevData.skladniki, oldIndex, newIndex),
  //       };
  //     });
  //   }
  // };
  //

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const {active, over} = event;
  //
  //   if (over && active.id !== over.id) {
  //
  //   }
  // }

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
          stepsList={formData.kroki}
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
