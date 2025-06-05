import React from "react";
import { ShoppingCart, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { items, count, total, removeItem, clearCart, isLoading } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = async (recipeId: number) => {
    await removeItem(recipeId);
  };

  const handleClearCart = async () => {
    if (window.confirm("Czy na pewno chcesz wyczyścić cały koszyk?")) {
      await clearCart();
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    // TODO: Implementacja w kolejnej fazie
    console.log("Przejście do płatności");
  };

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleContinueShopping}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do zakupów
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Koszyk</h1>
          </div>

          {/* Pusty koszyk */}
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Twój koszyk jest pusty
            </h2>
            <p className="text-gray-600 mb-6">
              Dodaj przepisy do koszyka, aby móc je kupić
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Przeglądaj przepisy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleContinueShopping}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kontynuuj zakupy
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              Koszyk ({count} {count === 1 ? "przepis" : "przepisów"})
            </h1>
            <button
              onClick={handleClearCart}
              disabled={isLoading}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              Wyczyść koszyk
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista elementów koszyka */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 ${
                    index !== items.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Obrazek przepisu */}
                    <div
                      className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                      onClick={() => handleRecipeClick(item.recipeId)}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                          <span className="text-orange-400 text-2xl">🍽️</span>
                        </div>
                      )}
                    </div>

                    {/* Informacje o przepisie */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-orange-600 transition-colors"
                        onClick={() => handleRecipeClick(item.recipeId)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Autor: {item.author.name} {item.author.surname}
                      </p>
                      <p className="text-xs text-gray-500">
                        Dodano:{" "}
                        {new Date(item.addedAt).toLocaleDateString("pl-PL")}
                      </p>
                    </div>

                    {/* Cena i akcje */}
                    <div className="flex flex-col items-end gap-3">
                      <span className="text-xl font-bold text-green-600">
                        {item.price.toFixed(2)} zł
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.recipeId)}
                        disabled={isLoading}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Usuń
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Podsumowanie zamówienia */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Podsumowanie zamówienia
              </h2>

              {/* Szczegóły płatności */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Liczba przepisów:</span>
                  <span className="text-gray-800">{count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wartość koszyka:</span>
                  <span className="text-gray-800">{total.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Opłaty serwisowe:</span>
                  <span className="text-gray-800">0,00 zł</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-800">Do zapłaty:</span>
                  <span className="text-green-600">{total.toFixed(2)} zł</span>
                </div>
              </div>

              {/* Przyciski akcji */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="w-5 h-5" />
                  Przejdź do płatności
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Kontynuuj zakupy
                </button>
              </div>

              {/* Informacja o bezpieczeństwie */}
              <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 text-center">
                  🔒 Bezpieczne płatności
                  <br />
                  Twoje dane są chronione
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
