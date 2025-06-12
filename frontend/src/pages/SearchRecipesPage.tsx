import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, Search, X } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';

// Interfejsy (te same co w Home.tsx)
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

// ✅ Polskie nazwy kategorii dla UI
const CATEGORIES = [
  'Wszystkie',
  'Desery',
  'Śniadania',
  'Obiady',
  'Przekąski',
  'Napoje',
  'Dodatki',
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Najnowsze' },
  { value: 'popular', label: 'Najpopularniejsze' },
  { value: 'rating', label: 'Najwyżej oceniane' },
  { value: 'price-low', label: 'Cena: od najniższej' },
  { value: 'price-high', label: 'Cena: od najwyższej' },
];

const FILTER_TYPES = [
  { value: '', label: 'Wszystkie przepisy' },
  { value: 'new', label: 'Nowe przepisy' },
  { value: 'popular', label: 'Popularne przepisy' },
  { value: 'featured', label: 'Wyróżnione przepisy' },
  { value: 'free', label: 'Darmowe przepisy' },
];

const RecipesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Stan strony
  const [recipes, setRecipes] = useState<RecipeCover[]>([]);
  const [allRecipes, setAllRecipes] = useState<RecipeCover[]>([]); // ✅ DODANE: Wszystkie przepisy z backendu
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);

  // Filtry i sortowanie
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // ✅ MAPOWANIE kategorii polskie nazwy <-> wartości z bazy
  const categoryMapping: Record<string, string> = {
    Wszystkie: '',
    Desery: 'deser',
    Śniadania: 'sniadanie',
    Obiady: 'obiad',
    Przekąski: 'przekąska',
    Napoje: 'napój',
    Dodatki: 'dodatek',
  };

  const reverseCategoryMapping: Record<string, string> = {
    deser: 'Desery',
    sniadanie: 'Śniadania',
    obiad: 'Obiady',
    przekąska: 'Przekąski',
    napój: 'Napoje',
    dodatek: 'Dodatki',
  };

  // Pobierz parametry z URL przy inicjalizacji
  useEffect(() => {
    const type = searchParams.get('type') || '';
    const categoryFromUrl = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');

    setSelectedType(type);
    // Mapuj wartość z URL na polską nazwę
    setSelectedCategory(reverseCategoryMapping[categoryFromUrl] || 'Wszystkie');
    setSearchQuery(search);
    setSortBy(sort);
    setCurrentPage(page);
  }, [searchParams]);

  // ✅ POBIERANIE wszystkich przepisów z backendu (bez filtrowania kategorii)
  const fetchAllRecipes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Przygotuj parametry URL - BEZ kategorii i 'free'
      const params = new URLSearchParams();

      // Wysyłaj tylko 'new', 'popular', 'featured' do backendu
      if (selectedType && selectedType !== '' && selectedType !== 'free') {
        params.append('type', selectedType);
      }

      if (searchQuery) params.append('search', searchQuery);
      params.append('page', '1'); // Pobierz wszystkie strony
      params.append('limit', '100'); // Zwiększ limit aby pobrać więcej przepisów

      const response = await fetch(`/api/recipe/covers?${params.toString()}`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Nie udało się pobrać przepisów');
      }

      const data: RecipeResponse = await response.json();
      setAllRecipes(data.recipes);
    } catch (error) {
      console.error('Błąd pobierania przepisów:', error);
      setAllRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTROWANIE i PAGINACJA po stronie frontendu
  const filterAndPaginateRecipes = () => {
    let filteredRecipes = [...allRecipes];

    // 1. Filtruj według kategorii
    if (selectedCategory !== 'Wszystkie') {
      const categoryValue = categoryMapping[selectedCategory];
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.category.toLowerCase() === categoryValue.toLowerCase(),
      );
    }

    // 2. Filtruj darmowe przepisy
    if (selectedType === 'free') {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.price === 0);
    }

    // 3. Sortowanie
    switch (sortBy) {
      case 'rating':
        filteredRecipes.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'price-low':
        filteredRecipes.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredRecipes.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filteredRecipes.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'newest':
      default:
        filteredRecipes.sort((a, b) => {
          const dateA = new Date(a.createdAt.split('.').reverse().join('-'));
          const dateB = new Date(b.createdAt.split('.').reverse().join('-'));
          return dateB.getTime() - dateA.getTime();
        });
        break;
    }

    // 4. Paginacja
    const itemsPerPage = 16;
    const totalFiltered = filteredRecipes.length;
    const totalPagesCalculated = Math.ceil(totalFiltered / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

    // 5. Aktualizuj stan
    setRecipes(paginatedRecipes);
    setTotalPages(totalPagesCalculated);
    setTotalRecipes(totalFiltered);
  };

  // Pobierz wszystkie przepisy przy zmianie typu, wyszukiwania
  useEffect(() => {
    fetchAllRecipes();
  }, [selectedType, searchQuery]);

  // Filtruj i paginuj przy zmianie filtrów lub strony
  useEffect(() => {
    if (allRecipes.length > 0) {
      filterAndPaginateRecipes();
    }
  }, [allRecipes, selectedCategory, selectedType, sortBy, currentPage]);

  // Aktualizuj URL przy zmianie filtrów
  const updateURL = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    // Reset strony przy zmianie filtrów (oprócz zmiany strony)
    if (!updates.page) {
      newParams.set('page', '1');
      setCurrentPage(1);
    }

    setSearchParams(newParams);
  };

  // Handlery dla filtrów
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    updateURL({ type });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const categoryValue = categoryMapping[category];
    updateURL({ category: categoryValue || '' });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateURL({ sort });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchQuery });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedType('');
    setSelectedCategory('Wszystkie');
    setSearchQuery('');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Określ tytuł strony na podstawie filtrów
  const getPageTitle = () => {
    if (searchQuery) return `Wyniki dla: "${searchQuery}"`;
    if (selectedType) {
      const typeOption = FILTER_TYPES.find((t) => t.value === selectedType);
      return typeOption?.label || 'Przepisy';
    }
    if (selectedCategory && selectedCategory !== 'Wszystkie') {
      return `Przepisy: ${selectedCategory}`;
    }
    return 'Wszystkie przepisy';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600">
            {loading ? 'Ładowanie...' : `Znaleziono ${totalRecipes} przepisów`}
          </p>
        </div>

        {/* Filtry i wyszukiwanie */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Wyszukiwanie */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj przepisów..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Toggle filtrów na mobile */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-orange-600 hover:text-orange-700"
            >
              <Filter className="w-4 h-4" />
              Filtry
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Przełącznik widoku */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-400'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filtry */}
          <div
            className={`grid md:grid-cols-4 gap-4 ${
              showFilters ? 'block' : 'hidden md:grid'
            }`}
          >
            {/* Typ przepisów */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typ przepisów
              </label>
              <select
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {FILTER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Kategoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sortowanie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sortuj według
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wyczyść filtry */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50 transition-colors"
              >
                Wyczyść filtry
              </button>
            </div>
          </div>
        </div>

        {/* Wyniki */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg h-80 animate-pulse"
              ></div>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <>
            <div
              className={`grid gap-6 mb-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  size={viewMode === 'list' ? 'large' : 'medium'}
                />
              ))}
            </div>

            {/* Paginacja */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Poprzednia
                </button>

                {/* Numery stron */}
                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = Math.max(1, currentPage - 2) + i;
                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-md ${
                          pageNum === currentPage
                            ? 'bg-orange-500 text-white'
                            : 'border border-gray-300 hover:border-orange-500 hover:text-orange-500'
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Następna
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nie znaleziono przepisów
            </h3>
            <p className="text-gray-500 mb-6">
              Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
