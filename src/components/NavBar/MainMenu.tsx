import { MenuItem } from "../../types/menuItem"

interface MainMenuProps {
  items: MenuItem[];
}

function MainMenu({items}: MainMenuProps) {

    return (
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[3vw] gap-6 md:font-light font-medium text-gray-500">
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