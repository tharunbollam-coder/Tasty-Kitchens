import {Component} from 'react'

import OrderStatusView from '../OrderStatusView'
import CartItem from '../CartItem'
import CartTotal from '../CartTotal'

import CartContext from '../../context/CartContext'

import './index.css'

class CartView extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, isOrderPlaced, removeAllCartItems} = value
          return isOrderPlaced ? (
            <OrderStatusView />
          ) : (
            <div className="cart-content-container">
              <button className="clear-cart-btn" onClick={removeAllCartItems}>
                Clear All
              </button>
              <div className="cart-header-items">
                <p className="cart-heading">Item</p>
                <p className="cart-heading">Quantity</p>
                <p className="cart-heading">Price</p>
              </div>

              {cartList.map(eachItem => (
                <CartItem key={eachItem.id} data={eachItem} />
              ))}

              <CartTotal />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartView
