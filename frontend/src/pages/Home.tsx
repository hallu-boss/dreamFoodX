import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Calendar,
  Loader2,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

// Typy dla przepisu
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

interface RecipeResponse {
  recipes: RecipeCover[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  type: string;
}

// Komponent okładki przepisu
const RecipeCard: React.FC<{
  recipe: RecipeCover;
  size?: 'small' | 'medium';
}> = ({ recipe, size = 'medium' }) => {
  const navigate = useNavigate();
  const { addItem, isInCart, isLoading } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const cardClasses = size === 'small' ? 'min-w-72 w-72' : 'w-full';
  const inCart = isInCart(recipe.id);

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Zapobiega przekierowaniu przy kliknięciu na przyciski akcji
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
    <div
      className={`${cardClasses} bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group`}
      onClick={handleCardClick}
    >
      {/* Komunikat o sukcesie */}
      {showSuccessMessage && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-medium z-10 animate-pulse">
          ✓ Dodano do koszyka!
        </div>
      )}

      {/* Zdjęcie przepisu */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
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

        {/* Cena */}
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

        {/* Status właściciela/kupującego */}
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
      </div>

      {/* Zawartość karty */}
      <div className="p-4">
        {/* Kategoria */}
        <div className="text-xs text-orange-600 font-medium mb-1 uppercase tracking-wide">
          {recipe.category}
        </div>

        {/* Tytuł */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
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
        <div className="flex gap-2">
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

// Komponent slidera
const RecipeSlider: React.FC<{
  title: string;
  recipes: RecipeCover[];
  loading: boolean;
}> = ({ title, recipes, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const recipesPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + recipesPerView >= recipes.length ? 0 : prev + recipesPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - recipesPerView < 0
        ? Math.max(0, recipes.length - recipesPerView)
        : prev - recipesPerView
    );
  };

  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="min-w-72 w-72 bg-gray-200 rounded-lg h-80 animate-pulse"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  if (recipes.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="text-center py-12 text-gray-500">
          Brak przepisów do wyświetlenia
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex + recipesPerView >= recipes.length}
            className="p-2 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (288 + 16)}px)` }}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} size="small" />
          ))}
        </div>
      </div>
    </section>
  );
};

// Główny komponent strony Home
const Home: React.FC = () => {
  const [newRecipes, setNewRecipes] = useState<RecipeCover[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<RecipeCover[]>([]);
  const [allRecipes, setAllRecipes] = useState<RecipeCover[]>([]);
  const [loading, setLoading] = useState({
    new: true,
    popular: true,
    all: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Sprawdź czy użytkownik jest zalogowany przy montowaniu komponentu
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Funkcja do pobierania przepisów
  const fetchRecipes = async (type: string, page = 1) => {
    try {
      const limit = type === 'all' ? 12 : 8;

      // Pobierz token z localStorage
      const token = localStorage.getItem('token');

      // Przygotuj headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Dodaj Authorization header jeśli token istnieje
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `/api/recipe/covers?type=${type}&page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error('Nie udało się pobrać przepisów');
      }

      const data: RecipeResponse = await response.json();
      return data;
    } catch (error) {
      console.error(`Błąd pobierania przepisów ${type}:`, error);
      return null;
    }
  };

  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    // Pobierz nowe przepisy
    fetchRecipes('new').then((data) => {
      if (data) {
        setNewRecipes(data.recipes);
      }
      setLoading((prev) => ({ ...prev, new: false }));
    });

    // Pobierz popularne przepisy
    fetchRecipes('popular').then((data) => {
      if (data) {
        setPopularRecipes(data.recipes);
      }
      setLoading((prev) => ({ ...prev, popular: false }));
    });

    // Pobierz wszystkie przepisy
    fetchRecipes('').then((data) => {
      if (data) {
        setAllRecipes(data.recipes);
        setTotalPages(data.pagination.totalPages);
      }
      setLoading((prev) => ({ ...prev, all: false }));
    });
  }, []);

  // Funkcja do ładowania kolejnych stron dla sekcji "Wszystkie"
  const loadMoreRecipes = async (page: number) => {
    setLoading((prev) => ({ ...prev, all: true }));
    const data = await fetchRecipes('', page);
    if (data) {
      setAllRecipes(data.recipes);
      setCurrentPage(page);
    }
    setLoading((prev) => ({ ...prev, all: false }));
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Odkryj najlepsze przepisy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Przeglądaj tysiące przepisów od najlepszych kucharzy i twórz
            niesamowite posiłki
          </p>
          {isLoggedIn && (
            <p className="text-sm text-orange-600 mt-2">
              ✨ Zalogowany - widzisz dodatkowe informacje o przepisach
            </p>
          )}
        </div>

        {/* Sekcja: Nowe przepisy (slider) */}
        <RecipeSlider
          title="Najnowsze przepisy"
          recipes={newRecipes}
          loading={loading.new}
        />

        {/* Sekcja: Popularne przepisy (slider) */}
        <RecipeSlider
          title="Popularne przepisy"
          recipes={popularRecipes}
          loading={loading.popular}
        />

        {/* Sekcja: Wszystkie przepisy (siatka) */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Wszystkie przepisy
          </h2>

          {loading.all ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg h-80 animate-pulse"
                ></div>
              ))}
            </div>
          ) : allRecipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {allRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              {/* Paginacja */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => loadMoreRecipes(currentPage - 1)}
                    disabled={currentPage === 1 || loading.all}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Poprzednia
                  </button>

                  <span className="px-4 py-2 text-gray-600">
                    Strona {currentPage} z {totalPages}
                  </span>

                  <button
                    onClick={() => loadMoreRecipes(currentPage + 1)}
                    disabled={currentPage === totalPages || loading.all}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Następna
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Brak przepisów do wyświetlenia
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
