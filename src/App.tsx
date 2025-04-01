import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Profile from "../src/pages/Profile";
import NavBar from "./components/NavBar/NavBar";
import NewRecipe from "./pages/NewRecipe";

function App() {
  return (
    <Router>
      <NavBar logoPath="src/assets/logo-text-v2.svg" showNewRecipeBtn={true} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newrecipe" element={<NewRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
