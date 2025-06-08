import React, { useEffect, useState } from 'react';

import { RecipeFormStep, IngredientItem } from '../types/newRecipe';
import NewRecipeLegend from '../components/NewRecipe/NewRecipeLegend';
import InformacjeForm from '../components/NewRecipe/Forms/InformacjeForm';
import SkladnikiForm from '../components/NewRecipe/Forms/SkladnikiForm';
import KrokiForm from '../components/NewRecipe/Forms/KrokiForm';
import { API_BASE_URL } from '../App';

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
  visible: boolean;
  price?: number;
  steps: NewRecipeStep[];
}

const NewRecipe: React.FC = () => {
  // Stan aktualnego kroku formularza
  const [currentStep, setCurrentStep] = useState<RecipeFormStep>('informacje');

  // Stan danych formularza
  const [formData, setFormData] = useState<NewRecipeInfo>({
    title: '',
    description: '',
    category: '',
    visible: false,
    steps: [],
  });

  // Osobny stan dla obrazka
  const [recipeImage, setRecipeImage] = useState<File | null>(null);

  // Stany dla ładowania i komunikatów
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Stany dla składników
  const [allIngredients, setAllIngredients] = useState<IngredientItem[]>([]);
  const [availCategories, setAvailCategories] = useState<string[]>([]);

  useEffect(() => {
    // Pobierz wszystkie składniki (publiczne) - potrzebne do kategorii
    const fetchAllIngredients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ingredients/all`);
        const data = await response.json();

        setAllIngredients(data);

        // Wyciągnij unikalne kategorie z wszystkich składników
        const categories: string[] = [
          ...new Set(data.map((ing: IngredientItem) => ing.category)),
        ] as string[];

        setAvailCategories(categories);
      } catch (error) {
        console.error('Błąd ładowania składników:', error);
      }
    };

    fetchAllIngredients();
  }, []);

  // Funkcja do pobierania składników użytkownika
  const fetchUserIngredients = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ingredients/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Nie udało się pobrać składników użytkownika');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Błąd ładowania składników użytkownika:', error);
      throw error;
    }
  };

  // Obsługa zmiany wartości w formularzu
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    // Handle file input separately
    if (type === 'image') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setRecipeImage(fileInput.files[0]);
      }
      return;
    }

    // Handle checkbox for visible field
    if (type === 'checkbox' && name === 'visible') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
        // Wyczyść cenę gdy przepis staje się prywatny
        price: checked ? formData.price : undefined,
      });
      return;
    }

    const numVal = name === 'price' ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: numVal });
  };

  async function handleFinish() {
    setIsLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Create FormData for multipart/form-data upload
      const formDataToSend = new FormData();

      // Add recipe data as JSON
      const recipeDataJSON = JSON.stringify({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        visible: formData.visible,
        price: formData.visible ? formData.price : null, // Wyślij price tylko jeśli visible=true
        steps: formData.steps,
      });

      formDataToSend.append('recipeData', recipeDataJSON);

      // Add image file if exists
      if (recipeImage) {
        formDataToSend.append('image', recipeImage);
      }

      const response = await fetch(`${API_BASE_URL}/recipe/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // Don't set Content-Type here - FormData sets it automatically with boundary
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Błąd ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log('Recipe created successfully:', result);

      setSubmitStatus({
        type: 'success',
        message: `Przepis "${formData.title}" został pomyślnie utworzony!`,
      });

      // Opcjonalnie: wyczyść formularz po sukcesie
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          category: '',
          visible: false,
          steps: [],
        });
        setRecipeImage(null);
        setCurrentStep('informacje');
        setSubmitStatus({ type: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error creating recipe:', error);
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Wystąpił nieoczekiwany błąd podczas tworzenia przepisu',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Funkcje do obsługi kroków
  const addStep = (step: NewRecipeStep) => {
    setFormData({
      ...formData,
      steps: [...formData.steps, step],
    });
  };

  const updateStepsList = (newSteps: NewRecipeStep[]) => {
    setFormData({
      ...formData,
      steps: newSteps,
    });
  };

  // Przejście do następnego kroku
  const handleNextStep = async () => {
    if (currentStep === 'informacje') {
      setCurrentStep('skladniki');
    } else if (currentStep === 'skladniki') {
      // Po zatwierdzeniu składników, pobierz ponownie dane użytkownika i przejdź do kroków
      try {
        const updatedUserIngredients = await fetchUserIngredients();
        console.log(
          'Zaktualizowane składniki użytkownika:',
          updatedUserIngredients
        );

        // Połącz wszystkie składniki (publiczne + użytkownika) dla KrokiForm
        const combinedIngredients = [
          ...allIngredients,
          ...updatedUserIngredients,
        ];
        setAllIngredients(combinedIngredients);

        setCurrentStep('kroki');
      } catch (error) {
        console.error(
          'Błąd podczas pobierania składników przed przejściem do kroków:',
          error
        );
        // Mimo błędu, pozwól przejść dalej z istniejącymi danymi
        setCurrentStep('kroki');
      }
    }
  };

  // Przejście do poprzedniego kroku
  const handlePrevStep = () => {
    if (currentStep === 'kroki') setCurrentStep('skladniki');
    else if (currentStep === 'skladniki') setCurrentStep('informacje');
  };

  // Renderowanie aktualnego kroku formularza
  const renderCurrentStepForm = () => {
    switch (currentStep) {
      case 'informacje':
        return (
          <InformacjeForm
            formData={formData}
            recipeImage={recipeImage}
            handleRecipeImageChange={(image) => setRecipeImage(image)}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 'skladniki':
        return (
          <SkladnikiForm
            availCategories={availCategories}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        );
      case 'kroki':
        return (
          <KrokiForm
            handlePrevStep={handlePrevStep}
            handleFinish={handleFinish}
            stepsList={formData.steps}
            ingredientsList={allIngredients} // Zawiera już połączone składniki publiczne + użytkownika
            addStep={addStep}
            updateStepsList={updateStepsList}
            isLoading={isLoading}
          />
        );
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
              {/* Komunikat o statusie */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg border-l-4 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border-green-400 text-green-700'
                      : 'bg-red-50 border-red-400 text-red-700'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {submitStatus.type === 'success' ? '✅' : '❌'}
                    </span>
                    <p className="font-medium">{submitStatus.message}</p>
                  </div>
                </div>
              )}

              {/* Animacja ładowania */}
              {isLoading && (
                <div className="mb-6 flex items-center justify-center p-8 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-blue-700 font-medium">
                      Tworzenie przepisu...
                    </p>
                  </div>
                </div>
              )}

              {renderCurrentStepForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
