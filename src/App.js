import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'

import RestaurantDetails from './components/RestaurantDetails'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

import './App.css'

const getCartDataFromLocalStorage = () => {
  const stringifiedData = localStorage.getItem('cartData')
  const parsedData = JSON.parse(stringifiedData)
  if (parsedData === null) {
    return []
  }
  return parsedData
}

class App extends Component {
  state = {cartList: getCartDataFromLocalStorage(), isOrderPlaced: false}

  removeAllCartItems = () => {
    this.setState({cartList: []}, this.updateLocalStorage)
    this.placeOrder()
  }

  increaseQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }),
      this.updateLocalStorage,
    )
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity - 1
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }),
        }),
        this.updateLocalStorage,
      )
    } else {
      this.removeCartItem(id)
    }
  }

  placeOrder = () => {
    this.setState(pre => ({isOrderPlaced: !pre.isOrderPlaced}))
  }

  updateLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList}, this.updateLocalStorage)
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productObject) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (productObject.id === eachCartItem.id) {
              const updatedQuantity = product.quantity

              return {...eachCartItem, quantity: updatedQuantity}
            }

            return eachCartItem
          }),
        }),
        this.updateLocalStorage,
      )
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList}, this.updateLocalStorage)
    }
  }

  render() {
    const {cartList, isOrderPlaced} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          isOrderPlaced,
          placeOrder: this.placeOrder,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
