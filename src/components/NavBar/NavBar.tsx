import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { MenuItem } from "../../types/menuItem";
import MainMenu from "./MainMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadRecipes } from "../../api/recipe";

interface NavBarProps {
  logoPath: string;
  showNewRecipeBtn: boolean;
}


const mainMenuItems: MenuItem[] = [
  { label: "Wyróżnione", href: "#" },
  { label: "Nowe", href: "#" },
  { label: "Popularne", href: "#" },
  { label: "Kategorie", href: "#" },
];

function NavBar({ logoPath, showNewRecipeBtn: showButton }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const profileAction = () => navigate("/profile");
  const shopingCartAction = () => loadRecipes();
  const searchAction = undefined;
  const newRecipeBtnAction = () => navigate("/newrecipe");

  return (
    <header className="bg-white shadow-md">
      <nav className="w-[92%] px-4 py-2 mx-auto flex items-center justify-between">
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
        <a href="/">
          <img
            src={logoPath}
            className="hover:scale-105 transition-all align-top min-w-[160px]"
            alt=""
          />
        </a>
        <div
          className={`md:static absolute flex px-5 py-5 md:min-h-fit md:w-auto left-0 w-full bg-white transition-all
            ${isMenuOpen ? "top-[6%]" : "top-[-100%]"}
          `}
        >
          <MainMenu items={mainMenuItems} />
        </div>
        <div className="flex items-center justify-end md:min-w-[230px]">
          {showButton && (
            <button
              className="btn md:flex hidden right-full mr-5"
              onClick={newRecipeBtnAction}
            >
              Nowy przepis
            </button>
          )}
          <div className="flex items-center gap-2">
            <ShoppingCart className="ico-btn" onClick={shopingCartAction} />
            <User className="ico-btn" onClick={profileAction} />
            <Search className="ico-btn" onClick={searchAction} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
