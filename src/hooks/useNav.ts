import { useNavigate } from "react-router-dom";
import { MenuItem } from "../types/menuItem";
import useUserData from "./useUserData";

export default function useNav() {
    const logoPath = "src/assets/logo-text-v2.svg";
    const logoHref = "/";

    const navigate = useNavigate();

    const menu: MenuItem[] = [
      { label: "Wyróżnione", href: "#" },
      { label: "Nowe", href: "#" },
      { label: "Popularne", href: "#" },
      { label: "Kategorie", href: "#" },
    ];

    const {userData} = useUserData();

    function goToProfile() {
        if (userData.isLoggedIn) {
            navigate("/profile")
        } else {
            navigate("/login")
        }
    }

    function goToCart() {
        if (userData.isLoggedIn) {
            navigate("/cart")
        } else {
            navigate("/login")
        }
    }

    function goToSearch() {
        return
    }

    function newRecipe() {
        if (userData.isLoggedIn) {
            navigate("/new-recipe")
        } else {
            navigate("/login")
        }
    }

    return {
        logoPath,
        logoHref,
        menu,
        goToProfile,
        goToCart,
        goToSearch,
        newRecipe
    }

}