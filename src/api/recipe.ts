import { Firestore, getDocs } from "firebase/firestore";
import { Recipe } from "../types/recipe/recipe";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { RecipeStep, WeightStep, MixStep } from "../types/recipe/recipeStep";

export const addRecipeToFirestore = async (db: Firestore, recipe: Recipe) => {
    try {
        // Ustawiamy aktualną datę dodania, jeśli nie została ustawiona
        const newRecipe = {
            ...recipe,
            createdAt: recipe.createdAt || new Date() // Jeśli brak daty, dodajemy bieżącą
        };

        // Dodaj przepis do kolekcji "recipes"
        const docRef = await addDoc(collection(db, "recipes"), newRecipe);
        console.log("Recipe added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding recipe: ", error);
        throw error;
    }
};



const mapRecipeSteps = (stepsData: any[]): RecipeStep[] => {
    return stepsData.map((step) => {
      if (step.ingredient) {
        return {
          ...step,
          ingredient: {
            title: step.ingredient.title,
            amount: step.ingredient.amount,
            unit: step.ingredient.unit,
          }
        } as WeightStep;
      }
  
      if (step.speed && step.temperature && step.duration) {
        return {
          ...step,
          speed: step.speed,
          temperature: step.temperature,
          duration: step.duration,
        } as MixStep;
      }
  
      return step as RecipeStep;
    });
  };
  
  const getRecipesFromFirestore = async () => {
    const recipeCollectionRef = collection(db, "recipes");
    const querySnapshot = await getDocs(recipeCollectionRef);
  
    const recipes: Recipe[] = [];
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const recipe: Recipe = {
        title: data.title,
        imgSrc: data.imgSrc,
        creator: data.creator,
        ingridients: data.ingredients,
        recipeSteps: mapRecipeSteps(data.recipeSteps),
        categories: data.categories,
        price: data.price,
        rating: data.rating,
        reviews: data.reviews,
        keywords: data.keywords,
        createdAt: data.createdAt.toDate() // Zamiana Timestamp na Date
      };
      recipes.push(recipe);
    });
  
    return recipes;
  };
  
 export const loadRecipes = async () => {
    try {
      const recipesData = await getRecipesFromFirestore();
      console.log(recipesData);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };