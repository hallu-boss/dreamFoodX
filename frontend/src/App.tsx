import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import NewRecipe from './pages/NewRecipe';
import useUserData from './hooks/useUserData';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import { RecipePage } from './pages/RecipePage';
import { RecipePlayPage } from './pages/RecipePlayPage';
import RecipesPage from './pages/SearchRecipesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import TermsOfServicePage from './pages/TermsOfServicePage';
import logoImage from './assets/logo-text-v2.svg';
import { CartProvider } from './contexts/CartContext';

export const API_BASE_URL = '/api';

function App() {
  const { userData, preliminaryLogin, logOut } = useUserData();

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <NavBar logoPath={logoImage} logoHref="/" />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route
                path="/profile"
                element={
                  <ProfilePage userData={userData} logoutUser={logOut} />
                }
              />
              <Route
                path="/login"
                element={<LoginPage preliminaryLogin={preliminaryLogin} />}
              />
              <Route path="/new-recipe" element={<NewRecipe />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/registration" element={<RegisterPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipe/play/:id" element={<RecipePlayPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route
                path="/terms-of-service"
                element={<TermsOfServicePage />}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
