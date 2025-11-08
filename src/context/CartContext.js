import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  isOrderPlaced: false,
  placeOrder: () => {},
  addCartItem: () => {},
  getQuantity: () => {},
  removeCartItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default CartContext
