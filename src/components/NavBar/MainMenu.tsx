import { MenuItem } from "../../types/menuItem"

interface MainMenuProps {
  items: MenuItem[];
}

function MainMenu({items}: MainMenuProps) {

    return (
        <ul className="flex items-center gap-[3vw] font-light text-gray-500">
          {items.map((item, index) =>(
            <li key={index}>
              <a className="hover:text-gray-700" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
    )
}

export default MainMenu