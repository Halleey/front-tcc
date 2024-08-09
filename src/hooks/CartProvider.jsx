import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    console.log('Removing one unit of item with ID:', itemId);
    setCartItems(prevItems => {
      const indexToRemove = prevItems.findIndex(item => item.id === itemId);
      if (indexToRemove !== -1) {
        const updatedItems = [...prevItems];
        updatedItems.splice(indexToRemove, 1);
        console.log('Updated cart items:', updatedItems);
        return updatedItems;
      }
      return prevItems;
    });
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
