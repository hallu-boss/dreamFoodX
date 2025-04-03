import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { MenuItem } from "../../types/menuItem";
import MainMenu from "./MainMenu";
import { useState } from "react";

interface NavBarProps {
  logoPath: string;
  logoHref: string;
  menu: MenuItem[];
  profileBtnAction: () => void;
  shoppingCartAction: () => void;
  searchBtnAction: () => void;
  newRecipeBtnAction: () => void;
  showNewRecipeBtn: boolean;
}

function NavBar({ logoPath, logoHref, menu, profileBtnAction, shoppingCartAction, searchBtnAction, newRecipeBtnAction, showNewRecipeBtn, }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const profileAction = () => navigate("/profile");
  // const shopingCartAction = undefined;
  // const searchAction = undefined;
  // const newRecipeBtnAction = () => navigate("/newrecipe");

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
        <a href={logoHref}>
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
          <MainMenu items={menu} />
        </div>
        <div className="flex items-center justify-end md:min-w-[230px]">
          {showNewRecipeBtn && (
            <button
              className="btn md:flex hidden right-full mr-5"
              onClick={newRecipeBtnAction}
            >
              Nowy przepis
            </button>
          )}
          <div className="flex items-center gap-2">
            <ShoppingCart className="ico-btn" onClick={shoppingCartAction} />
            <User className="ico-btn" onClick={profileBtnAction} />
            <Search className="ico-btn" onClick={searchBtnAction} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
