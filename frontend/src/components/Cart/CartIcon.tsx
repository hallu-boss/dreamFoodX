import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartIcon: React.FC = () => {
  const { count } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <button
      onClick={handleCartClick}
      className="ico-btn relative"
      title="Przejdź do koszyka"
    >
      <ShoppingCart className="w-6 h-6" />

      {/* Licznik elementów */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-medium">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
