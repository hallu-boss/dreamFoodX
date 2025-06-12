import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  ChefHat,
  ShoppingBag,
  Package,
  Eye,
  EyeOff,
  Calendar,
  Star,
  DollarSign,
  AlertCircle,
  LogOut,
  Key,
} from 'lucide-react';
import userImg from '../assets/user.png';

interface UserProfile {
  id: number;
  name: string;
  surname: string;
  email: string;
  cookingHours: number;
  recipes: Array<{
    id: number;
    title: string;
    visible: boolean;
    category: string;
    price: number;
    image?: string;
  }>;
  purchasedRecipes: Array<{
    id: number;
    title: string;
    category: string;
    image?: string;
  }>;
  ingredients: Array<{
    id: number;
    category: string;
    title: string;
    unit: string;
  }>;
}

interface ProfilePageProps {
  userData: {
    isLoggedIn: boolean;
    name?: string;
    surname?: string;
    email?: string;
    cookingHours?: number;
  };
  logoutUser: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userData, logoutUser }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'recipes' | 'purchased' | 'ingredients'
  >('recipes');
  const navigate = useNavigate();

  // Przekieruj na login jeśli nie zalogowany
  useEffect(() => {
    if (!userData.isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [userData.isLoggedIn, navigate]);

  // Pobierz profil użytkownika
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            logoutUser();
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();
        setProfile(profileData);
      } catch (err) {
        setError('Błąd podczas pobierania profilu: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (userData.isLoggedIn) {
      fetchProfile();
    }
  }, [userData.isLoggedIn, logoutUser, navigate]);

  const handleLogOut = async () => {
    try {
      logoutUser();
      navigate('/');
    } catch (err) {
      setError('Błąd wylogowania: ' + err);
    }
  };

  const handleChangePassword = () => {
    // TODO: Implementacja zmiany hasła
    console.log('Change password functionality');
  };

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  const toggleRecipeVisibility = async (
    recipeId: number,
    currentVisibility: boolean,
  ) => {
    // TODO: Implementacja zmiany widoczności przepisu
    console.log(
      `Toggle visibility for recipe ${recipeId}: ${!currentVisibility}`,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie profilu...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Błąd ładowania profilu
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              logoutUser();
              navigate('/');
              return;
            }}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Powrót do strony głównej
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Sekcja informacyjna */}
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Zdjęcie profilowe */}
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <img
                  src={userImg}
                  alt="Zdjęcie użytkownika"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Informacje użytkownika */}
              <div className="text-center md:text-left text-white flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {profile.name} {profile.surname}
                </h1>
                <p className="text-orange-100 mb-4">{profile.email}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4" />
                    <span>{profile.cookingHours} godzin gotowania</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>{profile.recipes.length} przepisów</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{profile.purchasedRecipes.length} kupionych</span>
                  </div>
                </div>
              </div>

              {/* Przyciski akcji */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <Key className="w-4 h-4" />
                  Zmień hasło
                </button>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Wyloguj
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nawigacja sekcji */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'recipes'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4" />
                  Moje przepisy ({profile.recipes.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('purchased')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'purchased'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Kupione przepisy ({profile.purchasedRecipes.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'ingredients'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Składniki ({profile.ingredients.length})
                </div>
              </button>
            </nav>
          </div>

          {/* Zawartość sekcji */}
          <div className="p-6">
            {/* Sekcja: Moje przepisy */}
            {activeTab === 'recipes' && (
              <div>
                {profile.recipes.length > 0 ? (
                  <div className="grid gap-4">
                    {profile.recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors cursor-pointer"
                        onClick={() => handleRecipeClick(recipe.id)}
                      >
                        {/* Miniatura */}
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {recipe.image ? (
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                              <ChefHat className="w-6 h-6 text-orange-400" />
                            </div>
                          )}
                        </div>

                        {/* Informacje */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {recipe.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {recipe.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {recipe.price > 0
                                ? `${recipe.price} zł`
                                : 'Darmowy'}
                            </span>
                          </div>
                        </div>

                        {/* Status i akcje */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              recipe.visible
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {recipe.visible ? 'Widoczny' : 'Ukryty'}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRecipeVisibility(recipe.id, recipe.visible);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title={
                              recipe.visible ? 'Ukryj przepis' : 'Pokaż przepis'
                            }
                          >
                            {recipe.visible ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Nie masz jeszcze przepisów
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Rozpocznij swoją kulinarną przygodę i podziel się swoimi
                      przepisami!
                    </p>
                    <button
                      onClick={() => navigate('/new-recipe')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Dodaj pierwszy przepis
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Sekcja: Kupione przepisy */}
            {activeTab === 'purchased' && (
              <div>
                {profile.purchasedRecipes.length > 0 ? (
                  <div className="grid gap-4">
                    {profile.purchasedRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors cursor-pointer"
                        onClick={() => handleRecipeClick(recipe.id)}
                      >
                        {/* Miniatura */}
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {recipe.image ? (
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                              <ShoppingBag className="w-6 h-6 text-green-400" />
                            </div>
                          )}
                        </div>

                        {/* Informacje */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {recipe.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {recipe.category}
                            </span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Kupiony
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Nie masz kupionych przepisów
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Przeglądaj przepisy i znajdź coś dla siebie!
                    </p>
                    <button
                      onClick={() => navigate('/recipes')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Przeglądaj przepisy
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Sekcja: Składniki */}
            {activeTab === 'ingredients' && (
              <div>
                {profile.ingredients.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.ingredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate">
                              {ingredient.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Jednostka: {ingredient.unit}
                            </p>
                          </div>
                          <div className="ml-3">
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                              {ingredient.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Nie masz własnych składników
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Dodaj własne składniki podczas tworzenia przepisów!
                    </p>
                    <button
                      onClick={() => navigate('/new-recipe')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Utwórz przepis
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
