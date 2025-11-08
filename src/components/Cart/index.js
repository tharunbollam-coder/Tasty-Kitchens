import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartView from '../CartView'

import './index.css'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const isCartEmpty = cartList.length === 0

          return (
            <>
              <Header activeTabId="Cart" />
              <div className="cart-container">
                {isCartEmpty ? <EmptyCartView /> : <CartView />}
              </div>
              <Footer />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
