import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Calendar,
  ShoppingCart,
  Check,
  Loader2,
  Clock,
  Users,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface RecipeAuthor {
  id: number;
  name: string;
  surname: string;
}

interface RecipeCover {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  author: RecipeAuthor;
  createdAt: string;
  averageRating: number;
  reviewsCount: number;
  cookingTime: string;
  ingredientsCount: number;
  isPurchased?: boolean;
  isOwned?: boolean;
}

interface RecipeCardProps {
  recipe: RecipeCover;
  size?: 'small' | 'medium' | 'large';
  layout?: 'vertical' | 'horizontal';
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  size = 'medium',
  layout = 'vertical',
}) => {
  const navigate = useNavigate();
  const { addItem, isInCart, isLoading } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const inCart = isInCart(recipe.id);

  // Style classes based on size and layout
  const getCardClasses = () => {
    if (layout === 'horizontal') {
      return 'w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex';
    }

    switch (size) {
      case 'small':
        return 'min-w-72 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col';
      case 'large':
        return 'w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col';
      default:
        return 'w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col';
    }
  };

  const getImageClasses = () => {
    if (layout === 'horizontal') {
      return 'w-64 h-48 bg-gray-200 overflow-hidden flex-shrink-0';
    }
    return 'relative h-48 bg-gray-200 overflow-hidden';
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (inCart) {
      navigate('/cart');
      return;
    }

    setIsAddingToCart(true);

    try {
      const success = await addItem(recipe.id);
      if (success) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
      } else {
        console.error('Nie udało się dodać przepisu do koszyka');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania do koszyka:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={getCardClasses()} onClick={handleCardClick}>
      {/* Komunikat o sukcesie */}
      {showSuccessMessage && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-medium z-10 animate-pulse">
          ✓ Dodano do koszyka!
        </div>
      )}

      {/* Zdjęcie przepisu */}
      <div className={getImageClasses()}>
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <span className="text-orange-400 text-4xl">🍽️</span>
          </div>
        )}

        {/* Cena - tylko dla layout vertical */}
        {layout === 'vertical' && (
          <div className="absolute top-3 right-3">
            {recipe.price > 0 ? (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                {recipe.price.toFixed(2)} zł
              </span>
            ) : (
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                Darmowy
              </span>
            )}
          </div>
        )}

        {/* Status właściciela/kupującego - tylko dla layout vertical */}
        {layout === 'vertical' && (
          <>
            {recipe.isOwned && (
              <div className="absolute top-3 left-3">
                <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                  Twój
                </span>
              </div>
            )}
            {recipe.isPurchased && !recipe.isOwned && (
              <div className="absolute top-3 left-3">
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                  Kupiony
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Zawartość karty */}
      <div
        className={`p-4 ${
          layout === 'horizontal' ? 'flex-1' : 'flex-1 flex flex-col'
        }`}
      >
        {/* Header z kategorią i ceną (dla layout horizontal) */}
        <div className="flex items-start justify-between mb-2">
          <div className="text-xs text-orange-600 font-medium uppercase tracking-wide">
            {recipe.category}
          </div>
          {layout === 'horizontal' && (
            <div className="flex items-center gap-2">
              {recipe.price > 0 ? (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {recipe.price.toFixed(2)} zł
                </span>
              ) : (
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  Darmowy
                </span>
              )}
              {recipe.isOwned && (
                <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                  Twój
                </span>
              )}
              {recipe.isPurchased && !recipe.isOwned && (
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                  Kupiony
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tytuł */}
        <h3
          className={`font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors ${
            size === 'large' ? 'text-xl' : 'text-lg'
          }`}
        >
          {recipe.title}
        </h3>

        {/* Opis */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>

        {/* Autor */}
        <div className="text-sm text-gray-500 mb-3">
          <span>
            Autor: {recipe.author.name} {recipe.author.surname}
          </span>
        </div>

        {/* Dodatkowe informacje dla większych kart */}
        {(size === 'large' || layout === 'horizontal') && (
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookingTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.ingredientsCount} składników</span>
            </div>
          </div>
        )}

        {/* Statystyki */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{recipe.averageRating.toFixed(1)}</span>
            <span className="text-gray-400">({recipe.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{recipe.createdAt}</span>
          </div>
        </div>

        {/* Przyciski akcji */}
        <div
          className={`flex gap-2 ${layout !== 'horizontal' ? 'mt-auto' : ''}`}
        >
          <button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
            onClick={handleActionClick}
          >
            Zobacz przepis
          </button>
          {recipe.price > 0 && !recipe.isPurchased && !recipe.isOwned && (
            <button
              className={`p-2 rounded-md transition-colors flex items-center justify-center min-w-[40px] ${
                inCart
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } ${
                isAddingToCart || isLoading
                  ? 'opacity-75 cursor-not-allowed'
                  : ''
              }`}
              onClick={handleAddToCart}
              disabled={isAddingToCart || isLoading}
              title={
                inCart
                  ? 'W koszyku - kliknij aby przejść do koszyka'
                  : 'Dodaj do koszyka'
              }
            >
              {isAddingToCart ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : inCart ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
