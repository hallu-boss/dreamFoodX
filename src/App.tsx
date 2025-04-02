import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Profile from "../src/pages/Profile";
import NavBar from "./components/NavBar/NavBar";
import NewRecipe from "./pages/NewRecipe";
import { UserLogin } from "./types/dataUser";

function App() {
  const userData = new UserLogin("noUser", 0, 0, "example@example.com", false);


  return (
    <Router>
      <NavBar logoPath="src/assets/logo-text-v2.svg" showNewRecipeBtn={true} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile userLogged={userData}/>} />
        <Route path="/newrecipe" element={<NewRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
