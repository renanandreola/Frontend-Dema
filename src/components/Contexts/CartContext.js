// CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeAllCart = () => {
    const emptyArray = [];
    setCartItems(emptyArray);
    sessionStorage.setItem("cart", JSON.stringify(emptyArray));
  };

  const getTotalCartPrice = () => {
    var total = 0;

    cartItems.forEach((product) => {
      total += product.price * product.qtd;
    });

    return total;
  };

  const getTotalCartUnity = () => {
    var un = 0;

    cartItems.forEach((product) => {
      un += product.qtd;
    });

    return un + " unidade(s)";
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeAllCart,
        getTotalCartPrice,
        getTotalCartUnity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
