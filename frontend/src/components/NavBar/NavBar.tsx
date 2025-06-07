import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { MenuItem } from '../../types/menuItem';
import MainMenu from './MainMenu';
import { useNavigate } from 'react-router-dom';
import useUserData from '../../hooks/useUserData';
import CartIcon from '../Cart/CartIcon';

interface NavBarProps {
  logoPath: string;
  logoHref: string;
}

function NavBar({ logoPath, logoHref }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { userData } = useUserData();
  const navigate = useNavigate();

  // Zaktualizowane menu z nawigacją do filtrowanych przepisów
  const menu: MenuItem[] = [
    {
      label: 'Wyróżnione',
      href: '/recipes?type=featured',
    },
    {
      label: 'Nowe',
      href: '/recipes?type=new',
    },
    {
      label: 'Popularne',
      href: '/recipes?type=popular',
    },
    {
      label: 'Kategorie',
      href: '#',
      submenu: [
        { label: 'Śniadania', href: '/recipes?category=Śniadania' },
        { label: 'Obiady', href: '/recipes?category=Obiady' },
        { label: 'Kolacje', href: '/recipes?category=Kolacje' },
        { label: 'Desery', href: '/recipes?category=Desery' },
        { label: 'Napoje', href: '/recipes?category=Napoje' },
        { label: 'Przekąski', href: '/recipes?category=Przekąski' },
        { label: 'Wegetariańskie', href: '/recipes?category=Wegetariańskie' },
        { label: 'Wegańskie', href: '/recipes?category=Wegańskie' },
        { label: 'Bezglutenowe', href: '/recipes?category=Bezglutenowe' },
        { label: 'Wszystkie', href: '/recipes' },
      ],
    },
  ];

  function goToProfile() {
    navigate(userData.isLoggedIn ? '/profile' : '/login');
  }

  function goToCart() {
    if (userData.isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  }

  function newRecipe() {
    navigate(userData.isLoggedIn ? '/new-recipe' : '/login');
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  }

  function toggleSearch() {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  }

  return (
    <header className="bg-white shadow-md relative">
      <nav className="w-[92%] px-4 py-2 mx-auto flex items-center justify-between">
        {/* Hamburger menu / Close button */}
        {!isMenuOpen ? (
          <Menu
            className="ico-btn flex md:hidden"
            onClick={() => setIsMenuOpen(true)}
          />
        ) : (
          <X
            className="ico-btn flex md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Logo */}
        <a href={logoHref}>
          <img
            src={logoPath}
            className="hover:scale-105 transition-all align-top min-w-[160px]"
            alt="DreamFood Logo"
          />
        </a>

        {/* Desktop menu */}
        <div
          className={`md:static absolute flex px-5 py-5 md:min-h-fit md:w-auto left-0 w-full bg-white transition-all z-50 md:shadow-none shadow-lg
            ${isMenuOpen ? 'top-[100%]' : 'top-[-100%]'}
          `}
        >
          <MainMenu items={menu} />
        </div>

        {/* Right side actions */}
        <div className="flex items-center justify-end md:min-w-[280px]">
          {/* New Recipe button - tylko dla zalogowanych */}
          {userData.isLoggedIn && (
            <button className="btn md:flex hidden mr-5" onClick={newRecipe}>
              Nowy przepis
            </button>
          )}

          {/* Action icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <div
                className="ico-btn"
                onClick={toggleSearch}
                title="Wyszukaj przepisy"
              >
                <Search className="w-6 h-6" />
              </div>

              {/* Mobile/Desktop search dropdown */}
              {showSearch && (
                <div className="absolute right-0 top-12 w-80 max-w-[90vw] bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                  <form onSubmit={handleSearch}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Szukaj przepisów..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
                      >
                        Szukaj
                      </button>
                    </div>
                  </form>

                  {/* Quick search suggestions */}
                  <div className="mt-3 text-xs text-gray-500">
                    <div className="mb-2 font-medium">
                      Popularne wyszukiwania:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['pizza', 'makaron', 'sałatka', 'deser', 'zupa'].map(
                        (term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              navigate(`/recipes?search=${term}`);
                              setShowSearch(false);
                            }}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            {userData.isLoggedIn ? (
              <CartIcon />
            ) : (
              <div
                className="ico-btn cursor-pointer"
                onClick={goToCart}
                title="Zaloguj się aby zobaczyć koszyk"
              >
                <ShoppingCart className="w-6 h-6" />
              </div>
            )}

            {/* User Profile */}
            <div
              className="ico-btn"
              onClick={goToProfile}
              title={userData.isLoggedIn ? 'Profil użytkownika' : 'Zaloguj się'}
            >
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay dla zamknięcia menu */}
      {(isMenuOpen || showSearch) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setShowSearch(false);
          }}
        />
      )}
    </header>
  );
}

export default NavBar;
