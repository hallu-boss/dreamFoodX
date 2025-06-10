import { useState } from 'react';
import { redirectAndReload } from '../components/renderable_elements';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../App';
import { ChefHat, Mail, Lock, AlertCircle, UserPlus } from 'lucide-react';

const LoginPage = ({
  preliminaryLogin,
}: {
  preliminaryLogin: (email: string) => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Wypełnij wszystkie pola!');
      return;
    }

    setIsLoading(true);
    setError('');

    const userLoginInformation = { email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLoginInformation),
      });

      let data;
      try {
        data = await response.json();
      } catch  {
        data = null;
      }

      if (!response.ok) {
        setError(data?.error || 'Błąd logowania');
        return;
      }

      const token = data.token;
      localStorage.setItem('token', token);
      preliminaryLogin(email);

      // Sukces - przekierowanie
      redirectAndReload(navigate);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Błąd logowania:', error.message);
        setError(error.message);
      } else {
        console.error('Nieznany błąd:', error);
        setError('Wystąpił nieoczekiwany błąd');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/registration');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full">
            {/* Header Card */}
            <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ChefHat className="w-10 h-10 text-orange-500" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">DreamFood</h1>
                  <p className="text-orange-100">
                    Zaloguj się do swojego konta
                  </p>
                </div>
              </div>
            </div>

            {/* Login Form Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Form */}
              <div className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email
                    </div>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Wprowadź swój email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-500" />
                      Hasło
                    </div>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Wprowadź swoje hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Login button */}
                <div className="pt-2">
                  <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Logowanie...</span>
                      </>
                    ) : (
                      <>
                        <ChefHat className="w-4 h-4" />
                        Zaloguj się
                      </>
                    )}
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">lub</span>
                  </div>
                </div>

                {/* Sign up button */}
                <button
                  onClick={handleSignUp}
                  disabled={isLoading}
                  className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-orange-300 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Utwórz nowe konto
                </button>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <a
                  href="#"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors duration-200"
                >
                  Zapomniałeś hasła?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
