import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import NavBar from "./components/NavBar/NavBar";
import NewRecipe from "./pages/NewRecipe";
import useUserData from "./hooks/useUserData";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import { RecipePage } from "./pages/RecipePage";

function App() {
  const { userData, preliminaryLogin, logOut } = useUserData();

  return (
    <Router>
      <NavBar logoPath="src/assets/logo-text-v2.svg" logoHref="/" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={<ProfilePage userData={userData} logoutUser={logOut} />}
        />
        <Route
          path="/login"
          element={<LoginPage preliminaryLogin={preliminaryLogin} />}
        />
        <Route path="/new-recipe" element={<NewRecipe />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
