import React from 'react';
import { ChevronDown } from 'lucide-react'; // Używamy ikony ChevronDown

// Definicja typu dla pojedynczej opcji w dropdownie
interface DropdownOption {
  value: string | number; // Wartość opcji (może być stringiem lub liczbą)
  label: string;          // Etykieta wyświetlana użytkownikowi
}

// Definicja typów dla propsów komponentu Dropdown
interface DropdownProps {
  id?: string; // Opcjonalne ID dla elementu select
  name?: string; // Opcjonalny atrybut name
  value: string | number; // Aktualnie wybrana wartość
  onChange: (selectedValue: string | number) => void; // Funkcja wywoływana przy zmianie wartości
  options: DropdownOption[]; // Tablica dostępnych opcji
  placeholder?: string; // Tekst wyświetlany, gdy nic nie jest wybrane
  className?: string; // Dodatkowe klasy CSS dla kontenera (np. do layoutu)
  selectClassName?: string; // Dodatkowe klasy CSS bezpośrednio dla elementu <select>
  disabled?: boolean; // Czy dropdown ma być wyłączony
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Wybierz...", // Domyślny placeholder
  className = '',
  selectClassName = '',
  disabled = false,
}) => {

  // Handler zmiany wartości w <select>
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value); // Przekazujemy tylko wybraną wartość
  };

  return (
    // Kontener główny, przyjmuje dodatkowe klasy np. do pozycjonowania/rozmiaru
    <div className={`relative w-full text-gray-600 ${className}`}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleSelectChange}
        disabled={disabled}
        // Łączymy bazową klasę 'custom-select' z dodatkowymi klasami i klasą 'peer'
        // Klasa 'custom-select' powinna być zdefiniowana w CSS (np. przez @apply)
        // i zawierać m.in. 'appearance-none' oraz odpowiedni padding (np. pr-10)
        className={`w-full custom-select peer ${selectClassName} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        {/* Opcja placeholder */}
        {placeholder && (
          <option value="" disabled={value !== ""}> {/* Placeholder jest disabled tylko jeśli coś innego jest wybrane */}
            {placeholder}
          </option>
        )}
        {/* Mapowanie opcji */}
        {options.map((option) => (
          <option className='text-gray-500' key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Kontener ikony strzałki */}
      <div className={`absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 ${
          // Ukryj ikonę, gdy select ma focus (menu rozwinięte) lub jest disabled
          disabled ? 'opacity-50' : 'peer-focus:hidden'
        }`}>
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default Dropdown;
