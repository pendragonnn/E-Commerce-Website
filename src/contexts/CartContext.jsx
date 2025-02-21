import React, {createContext, useState, useEffect, Children } from 'react'

export const CartContext = createContext()

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product, id) => {
    console.log("Adding product:", product); // Cek struktur produk
    const newItem = { ...product, amount: 1 };
  
    const cartitem = cart.find(item => item.id === id);
  
    if (cartitem) {
      const newCart = cart.map(item => 
        item.id === id ? { ...item, amount: cartitem.amount + 1 } : item
      );
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };
  

  console.log(cart)

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
