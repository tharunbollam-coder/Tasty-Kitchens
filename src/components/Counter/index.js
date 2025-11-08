import './index.css'

const Counter = props => {
  const {foodId, quantity, increaseQuantity, decreaseQuantity} = props

  const onDecrement = () => {
    decreaseQuantity(foodId)
  }

  const onIncrement = () => {
    increaseQuantity(foodId)
  }

  return (
    <div className="cart-quantity-container">
      <button
        type="button"
        data-testid="decrement-quantity"
        className="quantity-button"
        onClick={onDecrement}
      >
        -
      </button>
      <p data-testid="item-quantity" className="food-quantity">
        {quantity}
      </p>
      <button
        type="button"
        data-testid="increment-quantity"
        className="quantity-button"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  )
}

export default Counter
