import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informacje o aplikacji */}
          <div>
            <h3 className="text-xl font-bold mb-4">DreamFood</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Platforma kulinarnych marzeń, gdzie możesz tworzyć, dzielić się i
              odkrywać najlepsze przepisy kulinarne. Dołącz do społeczności
              miłośników gotowania!
            </p>
          </div>

          {/* Przydatne linki */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Przydatne linki</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Strona główna
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Przeglądaj przepisy
                </Link>
              </li>
              <li>
                <Link
                  to="/new-recipe"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Dodaj przepis
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Mój profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Informacje prawne */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informacje prawne</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Warunki korzystania
                </Link>
              </li>
            </ul>

            {/* Kontakt */}
            <div className="mt-6">
              <h5 className="font-medium mb-2">Kontakt</h5>
              <p className="text-gray-300 text-sm">
                Email: contact@dreamfood.pl
              </p>
            </div>
          </div>
        </div>

        {/* Separacja */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} DreamFood. Wszystkie prawa zastrzeżone.
            </p>

            {/* Dodatkowe informacje */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Wersja 1.0</span>
              <span className="text-gray-400 text-sm">Made with ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
