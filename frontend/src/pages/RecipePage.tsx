import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Ingredient, IngredientsList } from "../components/RecipePage/IngredientsList";
import { RecipeStepCard } from "../components/RecipePage/RecipeStepCard";

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
  user: {
    name: string;
    surname: string;
  }
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  steps: RecipeStep[];
}

const tabs = ['Opis', 'Kroki']


export function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState('Opis');
  const [loading, setLoading] = useState(true);

  const filteredSteps = recipe?.steps.filter(step => step.stepType === 'ADD_INGREDIENT') ?? []
  const ingredients: Ingredient[] = filteredSteps.map(step => ({
    title: step.ingredient?.title,
    amount: step.amount,
    unit: step.ingredient?.unit
  } as Ingredient))


  useEffect(() => {
    fetch(`http://localhost:5000/api/recipe/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }, [])

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div className="min-h-screen bg-amber-50 py-4">
      <div className="w-[95%] mx-auto px-6 py-8 bg-white rounded-md text-gray-500">
        <h2 className="text-6xl font-bold mb-6">{recipe.title}</h2>
        <div className="flex flex-row gap-2">
          <div className="flex items-center justify-center p-4 bg-gray-100 rounded-md w-3/5">
            {recipe.image && <img className="w-[650px] rounded-md" src={recipe.image} alt={recipe.title} />}
          </div>
          <div className="flex items-start justify-end px-4 w-2/5">
            <IngredientsList
              ingredients={ingredients}
            />
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
                  {recipe.steps.map(step => (
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
  )
}
