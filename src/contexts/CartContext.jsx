import React, { createContext, useState, useEffect, Children } from 'react'

export const CartContext = createContext()

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [itemAmount, setItemAmount] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount
    }, 0)
    
    setTotal(total)
  })

  useEffect(() => {
    if(cart) {
      const amount = cart.reduce((accumulator, currentIndex) => {
        return accumulator + currentIndex.amount
      }, 0)

      setItemAmount(amount)
    }
  }, [cart])

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

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id
    })
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const increaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id)
    addToCart(cartItem, id)
  }

  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => {
      return item.id === id
    })

    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 }
        } else {
          return item
        }
      })
      setCart(newCart)
    }

    if (cartItem.amount < 2) {
      removeFromCart(id)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total }}>
      {children}
    </CartContext.Provider>
  )
}
