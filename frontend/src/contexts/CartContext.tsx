import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Import API_BASE_URL z App.tsx lub użyj proxy
const API_BASE_URL = "/api"; // Używa proxy z vite.config.ts

// Typy dla koszyka
interface CartItem {
  id: number;
  recipeId: number;
  title: string;
  price: number;
  image?: string;
  author: {
    name: string;
    surname: string;
  };
  addedAt: string;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  isLoading: boolean;
  addItem: (recipeId: number) => Promise<boolean>;
  removeItem: (recipeId: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  isInCart: (recipeId: number) => boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook do używania kontekstu koszyka
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Provider komponent
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      const token = getToken();

      if (token) {
        // Jeśli zalogowany, pobierz z serwera
        await refreshCart();
      } else {
        // Jeśli niezalogowany, użyj localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setItems(parsedCart);
          } catch (error) {
            console.error("Błąd parsowania koszyka z localStorage:", error);
            localStorage.removeItem("cart");
          }
        }
      }

      setIsInitialized(true);
    };

    initializeCart();
  }, []);

  // Funkcja do pobierania tokenu
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  // Funkcja do wykonywania requestów z tokenem
  const makeAuthenticatedRequest = async (
    url: string,
    options: RequestInit = {}
  ) => {
    const token = getToken();
    if (!token) {
      throw new Error("Użytkownik nie jest zalogowany");
    }

    // Dodaj pełny URL z API_BASE_URL jeśli nie jest już pełny
    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}/${url}`;

    return fetch(fullUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  };

  // Pobierz koszyk z localStorage przy inicjalizacji
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Błąd parsowania koszyka z localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Zapisz koszyk do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Oblicz łączną liczbę elementów
  const count = items.length;

  // Oblicz łączną wartość koszyka
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Sprawdź czy przepis jest w koszyku
  const isInCart = (recipeId: number): boolean => {
    return items.some((item) => item.recipeId === recipeId);
  };

  // Odśwież koszyk z serwera (wywołane ręcznie, np. na stronie koszyka)
  const refreshCart = async (): Promise<void> => {
    const token = getToken();
    if (!token) {
      console.log("Brak tokenu - pozostawienie koszyka lokalnego");
      return;
    }

    try {
      setIsLoading(true);
      const response = await makeAuthenticatedRequest("cart");

      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else if (response.status === 401) {
        console.warn("Token wygasł lub jest nieprawidłowy");
        setItems([]);
        localStorage.removeItem("token");
      } else if (response.status === 404) {
        // Koszyk nie istnieje - to normalne dla nowego użytkownika
        setItems([]);
      } else {
        console.error("Błąd pobierania koszyka:", response.status);
      }
    } catch (error) {
      console.error("Błąd synchronizacji koszyka:", error);
      // Nie czyść koszyka przy błędach sieciowych - pozostaw lokalny
    } finally {
      setIsLoading(false);
    }
  };

  // Dodaj element do koszyka
  const addItem = async (recipeId: number): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Sprawdź czy element już jest w koszyku
      if (isInCart(recipeId)) {
        console.warn("Przepis już jest w koszyku");
        return false;
      }

      const token = getToken();

      if (token) {
        // Jeśli użytkownik zalogowany, dodaj przez API
        const response = await makeAuthenticatedRequest("cart/add", {
          method: "POST",
          body: JSON.stringify({ recipeId }),
        });

        if (response.ok) {
          const data = await response.json();
          setItems((prev) => [...prev, data.item]);
          return true;
        } else {
          const errorData = await response.json();
          console.error("Błąd dodawania do koszyka:", errorData.error);
          return false;
        }
      } else {
        // Jeśli niezalogowany, pobierz dane przepisu i dodaj lokalnie
        const recipeResponse = await fetch(
          `${API_BASE_URL}/recipe/covers?type=&limit=1&search=id:${recipeId}`
        );

        if (recipeResponse.ok) {
          const recipeData = await recipeResponse.json();
          const recipe = recipeData.recipes.find((r: any) => r.id === recipeId);

          if (recipe) {
            const cartItem: CartItem = {
              id: Date.now(), // Tymczasowe ID dla localStorage
              recipeId: recipe.id,
              title: recipe.title,
              price: recipe.price,
              image: recipe.image,
              author: recipe.author,
              addedAt: new Date().toISOString(),
            };

            setItems((prev) => [...prev, cartItem]);
            return true;
          }
        }

        console.error("Nie udało się pobrać danych przepisu");
        return false;
      }
    } catch (error) {
      console.error("Błąd dodawania do koszyka:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Usuń element z koszyka
  const removeItem = async (recipeId: number): Promise<boolean> => {
    try {
      setIsLoading(true);

      const token = getToken();

      if (token) {
        // Jeśli zalogowany, usuń przez API
        const response = await makeAuthenticatedRequest(
          `cart/remove/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setItems((prev) => prev.filter((item) => item.recipeId !== recipeId));
          return true;
        } else {
          console.error("Błąd usuwania z koszyka");
          return false;
        }
      } else {
        // Jeśli niezalogowany, usuń lokalnie
        setItems((prev) => prev.filter((item) => item.recipeId !== recipeId));
        return true;
      }
    } catch (error) {
      console.error("Błąd usuwania z koszyka:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Wyczyść cały koszyk
  const clearCart = async (): Promise<boolean> => {
    try {
      setIsLoading(true);

      const token = getToken();

      if (token) {
        // Jeśli zalogowany, wyczyść przez API
        const response = await makeAuthenticatedRequest("cart/clear", {
          method: "DELETE",
        });

        if (response.ok) {
          setItems([]);
          return true;
        } else {
          console.error("Błąd czyszczenia koszyka");
          return false;
        }
      } else {
        // Jeśli niezalogowany, wyczyść lokalnie
        setItems([]);
        return true;
      }
    } catch (error) {
      console.error("Błąd czyszczenia koszyka:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: CartContextType = {
    items,
    count,
    total,
    isLoading,
    addItem,
    removeItem,
    clearCart,
    isInCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
