import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  submenu?: MenuItem[];
}

interface MainMenuProps {
  items: MenuItem[];
}

const MainMenu: React.FC<MainMenuProps> = ({ items }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleMenuItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.submenu) {
      e.preventDefault();
      setOpenSubmenu(openSubmenu === item.label ? null : item.label);
    } else {
      // Zamknij submenu przy nawigacji
      setOpenSubmenu(null);
    }
  };

  const handleSubmenuItemClick = () => {
    setOpenSubmenu(null);
  };

  return (
    <ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-4 w-full">
      {items.map((item) => (
        <li key={item.label} className="relative group">
          {/* Main menu item */}
          <a
            href={item.href}
            onClick={(e) => handleMenuItemClick(item, e)}
            className={`flex items-center gap-1 text-gray-700 hover:text-orange-600 transition-colors font-medium ${
              item.submenu ? 'cursor-pointer' : ''
            }`}
          >
            {item.label}
            {item.submenu && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openSubmenu === item.label ? 'rotate-180' : ''
                }`}
              />
            )}
          </a>

          {/* Desktop submenu (hover) */}
          {item.submenu && (
            <div className="hidden md:block absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {item.submenu.map((subItem) => (
                  <li key={subItem.label}>
                    <a
                      href={subItem.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      onClick={handleSubmenuItemClick}
                    >
                      {subItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mobile submenu (click) */}
          {item.submenu && openSubmenu === item.label && (
            <div className="md:hidden mt-2 ml-4 space-y-2">
              {item.submenu.map((subItem) => (
                <a
                  key={subItem.label}
                  href={subItem.href}
                  className="block text-gray-600 hover:text-orange-600 transition-colors text-sm"
                  onClick={handleSubmenuItemClick}
                >
                  {subItem.label}
                </a>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MainMenu;
