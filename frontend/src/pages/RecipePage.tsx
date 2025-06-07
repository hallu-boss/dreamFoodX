import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ingredient, IngredientsList } from "../components/RecipePage/IngredientsList";
import { RecipeStepCard } from "../components/RecipePage/RecipeStepCard";
import { useCart } from "../contexts/CartContext";
import { API_BASE_URL } from "../App";

export interface RecipeStep {
  id: number;
  title: string;
  stepType: 'ADD_INGREDIENT' | 'COOKING' | 'DESCRIPTION';

  ingredient?: {
    title: string;
    unit: string;
  }
  amount?: number;

  time?: string;
  temperature?: number;
  mixSpeed?: number;

  description?: string;
}

interface Recipe {
  id: number;
  createdAt: string;
  author: {
    name: string;
    surname: string;
  }
  title: string;
  description?: string;
  category: string;
  price: number;
  image: string;
  steps?: RecipeStep[];
}

const tabs = ['Opis', 'Kroki'];

const dummyIngredients: Ingredient[] = [
  {
    title: "Mleko",
    unit: "ml",
    amount: 320,
  },
  {
    title: "Sól",
    unit: "g",
    amount: 10,
  },
  {
    title: "Mąka pszenna",
    unit: "g",
    amount: 100,
  },
  {
    title: "Woda",
    unit: "g",
    amount: 234,
  },
  {
    title: "Gasde",
    unit: "g",
    amount: 300,
  },
  {
    title: "Ssdfs dsfasdf as",
    unit: "ml",
    amount: 300,
  },
]

export function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, isLoading: cartLoading } = useCart();
  const [permission, setPermission] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState('Opis');
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const filteredSteps = recipe?.steps?.filter(step => step.stepType === 'ADD_INGREDIENT') ?? [];
  const ingredients: Ingredient[] = filteredSteps.length > 0 ? filteredSteps.map(step => ({
    title: step.ingredient?.title,
    amount: step.amount,
    unit: step.ingredient?.unit
  } as Ingredient)) : dummyIngredients;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPermission(data.permission);
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async () => {
    if (!recipe || !id) return;

    try {
      setAddingToCart(true);
      const success = await addItem(parseInt(id));
      
      if (success) {
        // Przekieruj na stronę koszyka po udanym dodaniu
        navigate('/cart');
      } else {
        // Możesz dodać tutaj wyświetlenie błędu użytkownikowi
        console.error('Nie udało się dodać przepisu do koszyka');
        alert('Nie udało się dodać przepisu do koszyka. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania do koszyka:', error);
      alert('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div className="relative min-h-screen bg-amber-50 py-4">
      {/* Blur overlay when no permission */}
      <div className={`transition-all duration-300 ${!permission ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <div className="w-[95%] mx-auto px-6 py-8 bg-white rounded-md text-gray-500">
          <div className="flex flex-row mb-6 justify-start">
            <h2 className="text-6xl font-bold">{recipe.title}</h2>
            <button className="btn text-3xl mx-6 mt-2" onClick={() => navigate(`/recipe/play/${id}`)}>Gotuj</button>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex items-center justify-center p-4 bg-gray-100 rounded-md w-3/5">
              {recipe.image && <img className="w-[650px] rounded-md" src={recipe.image} alt={recipe.title} />}
            </div>
            <div className="flex items-start justify-end px-4 w-2/5">
              <IngredientsList ingredients={ingredients} />
            </div>
          </div>
          <div className="w-full ">
            <div className="w-full mx-auto mt-4">
              <div className="flex border-b border-gray-300 bg-gray-200 rounded-t-md">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    className={`w-1/2 py-4 text-center font-medium text-gray-500 ${activeTab === tab ? 'text-plant-500' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >{tab}</button>
                ))}
              </div>
              <div className="bg-gray-100 p-4 rounded-b-md">
                {activeTab === 'Opis' && (
                  <p>{recipe.description}</p>
                )}
                {activeTab === 'Kroki' && (
                  <ul>
                    {recipe.steps?.map(step => (
                      <li key={step.id} className="pb-2">
                        <RecipeStepCard step={step} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal if no permission */}
      {!permission && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Brak dostępu do przepisu</h2>
            <p className="mb-6 text-gray-700">Nie masz uprawnień do przeglądania tego przepisu.</p>
            <div className="flex-auto">
              <button
                onClick={() => navigate('/')}
                className="mx-2 py-2 text-gray-500 hover:text-gray-900 rounded-md transition"
              >
                Wróć na stronę główną
              </button>
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || cartLoading}
                className="mx-2 btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? 'Dodawanie...' : 'Dodaj do koszyka'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}