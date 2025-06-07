import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { MenuItem } from "../../types/menuItem";
import MainMenu from "./MainMenu";
import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import CartIcon from "../Cart/CartIcon";

interface NavBarProps {
  logoPath: string;
  logoHref: string;
}

function NavBar({ logoPath, logoHref }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useUserData();
  const navigate = useNavigate();

  const menu: MenuItem[] = [
    { label: "Wyróżnione", href: "#" },
    { label: "Nowe", href: "#" },
    { label: "Popularne", href: "#" },
    { label: "Kategorie", href: "#" },
  ];

  function goToProfile() {
    navigate(userData.isLoggedIn ? "/profile" : "/login");
  }

  function goToCart() {
    if (userData.isLoggedIn) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }

  function newRecipe() {
    navigate(userData.isLoggedIn ? "/new-recipe" : "/login");
  }

  function search() {
    return;
  }

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
          {userData.isLoggedIn && (
            <button
              className="btn md:flex hidden right-full mr-5"
              onClick={newRecipe}
            >
              Nowy przepis
            </button>
          )}
          <div className="flex items-center gap-2">
            {/* Ikona koszyka - zawsze widoczna, ale funkcjonalność zależy od logowania */}
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
            <User className="ico-btn" onClick={goToProfile} />
            <Search className="ico-btn" onClick={search} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;