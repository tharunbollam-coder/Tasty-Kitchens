import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import Counter from '../Counter'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {increaseQuantity, decreaseQuantity} = value
      const {data} = props
      const {id, name, cost, quantity, imageUrl} = data
      const itemPrice = cost * quantity
      return (
        <li className="cart-item-li" data-testid="cartItem">
          <img className="li-mobile-item-image" src={imageUrl} alt={name} />

          <div className="li-all-details-container">
            <div className="li-item-details-container">
              <img className="li-item-image" src={imageUrl} alt={name} />
              <h1 className="li-item-name">{name}</h1>
            </div>
            <Counter
              key={id}
              quantity={quantity}
              foodId={id}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />

            <div className="li-item-quantity-cost-container">
              <FaRupeeSign className="li-item-cost-icon" />
              <p className="li-item-cost-icon">{itemPrice}</p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
