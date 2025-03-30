import { Search, ShoppingCart, User } from "lucide-react";
import { MenuItem } from "../../types/menuItem";
import MainMenu from "./MainMenu";

interface NavBarProps {
  logoPath: string;
}

const mainMenuItems: MenuItem[] = [
  { label: "Wyróżnione", href: "#" },
  { label: "Nowe", href: "#" },
  { label: "Popularne", href: "#" },
  { label: "Kategorie", href: "#" },
];

function NavBar({ logoPath }: NavBarProps) {
  const showNewRecepieBtn = true;

  return (
    <nav className="w-full px-4 py-2 mx-auto bg-white shadow-md flex items-center justify-between">
      <a href="#">
        <img
          src={logoPath}
          width="160"
          className="d-inline-block align-top"
          alt=""
        />
      </a>
      <MainMenu items={mainMenuItems} />
      <div className="flex items-center justify-end gap-4 w-[225px]">
        {showNewRecepieBtn && <button className="btn right-full ">Nowy przepis</button>}
        <div className="flex items-center gap-2">
          <ShoppingCart className="ico-btn" />
          <User className="ico-btn" />
          <Search className="ico-btn" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
