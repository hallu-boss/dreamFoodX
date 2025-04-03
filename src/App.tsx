import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import NavBar from "./components/NavBar/NavBar";
import NewRecipe from "./pages/NewRecipe";
import useUserData from "./hooks/useUserData";
import LoginPage from "./pages/LoginPage";


function App() {
  const {
          userData,
          setUserData,
          preliminaryLogin,
          logOut
        } = useUserData();
  

  return (
    <Router>
      <NavBar logoPath="src/assets/logo-text-v2.svg" showNewRecipeBtn={userData.checkLoginStatus()} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<LoginPage preliminaryLogin={preliminaryLogin} logoutUser={logOut}/>} />
        <Route path="/newrecipe" element={<NewRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
