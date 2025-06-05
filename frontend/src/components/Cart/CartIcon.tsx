import React, { useState } from "react";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartIcon: React.FC = () => {
  const { items, count, total, removeItem, isLoading } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGoToCart = () => {
    setIsDropdownOpen(false);
    navigate("/cart");
  };

  const handleRemoveItem = async (recipeId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await removeItem(recipeId);
  };

  return (
    <div className="relative">
      {/* Ikona koszyka */}
      <button
        onClick={handleCartClick}
        className="ico-btn relative"
        disabled={isLoading}
      >
        <ShoppingCart className="w-6 h-6" />

        {/* Licznik elementów */}
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-medium">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Dropdown z miniaturą koszyka */}
      {isDropdownOpen && (
        <>
          {/* Backdrop do zamykania dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Dropdown content */}
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Koszyk ({count})
              </h3>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                /* Pusty koszyk */
                <div className="p-6 text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">Twój koszyk jest pusty</p>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Kontynuuj zakupy
                  </button>
                </div>
              ) : (
                /* Lista elementów koszyka */
                <>
                  <div className="p-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                      >
                        {/* Obrazek przepisu */}
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                              <span className="text-orange-400 text-lg">
                                🍽️
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Informacje o przepisie */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {item.author.name} {item.author.surname}
                          </p>
                          <p className="text-sm font-semibold text-green-600">
                            {item.price.toFixed(2)} zł
                          </p>
                        </div>

                        {/* Przycisk usunięcia */}
                        <button
                          onClick={(e) => handleRemoveItem(item.recipeId, e)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Footer z sumą i przyciskami */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">
                        Suma:
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        {total.toFixed(2)} zł
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleGoToCart}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-md text-sm font-medium transition-colors"
                      >
                        Zobacz koszyk
                      </button>
                      <button
                        onClick={handleGoToCart}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                      >
                        Do kasy
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartIcon;
