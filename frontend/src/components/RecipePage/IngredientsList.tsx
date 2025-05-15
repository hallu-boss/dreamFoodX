export interface Ingredient {
  title: string;
  amount: number;
  unit: string;
}

interface IngredientsListParams {
  ingredients: Ingredient[];
}

export function IngredientsList({ ingredients }: IngredientsListParams) {
  return (
    <div className="bg-plant-100 rounded-md w-full">
      <h3 className="text-4xl mx-6 my-4">Składniki</h3>
      <div className="border-t-2 border-dotted border-gray-400 my-4"></div>
      <ul className="list-disc text-2xl mx-10 py-2">
        {ingredients.map((item, index) => (
          <li key={index}>
            <div className="flex flex-row justify-between mb-4">
              <p>{item.title}</p>
              <div className="flex flex-row">
                <p>{item.amount}</p>
                <p className="text-gray-400">{item.unit}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
