import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburger} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {showNavItems: false}

  onShowNavItems = () => {
    this.setState({showNavItems: true})
  }

  onDisableNavItems = () => {
    this.setState({showNavItems: false})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  navItems = () => (
    <div className="nav-items-container">
      <div className="nav-items">
        <ul className="nav-list">
          <li className="nav-item-home">
            <Link to="/" className="link-item">
              Home
            </Link>
          </li>
          <li className="nav-item-cart">
            <Link to="/cart" className="link-item">
              Cart
            </Link>
          </li>
        </ul>
        <button className="logout-button" onClick={this.onClickLogout}>
          Logout
        </button>
      </div>
      <button className="close-button" onClick={this.onDisableNavItems}>
        <IoIosCloseCircle className="close-icon" aria-label="close" />
      </button>
    </div>
  )

  navMobile = () => {
    const {showNavItems} = this.state
    return (
      <nav className="nav-container">
        <div className="nav">
          <div className="nav-logo-container">
            <Link to="/">
              <img
                className="nav-logo"
                src="https://res.cloudinary.com/dogmybs69/image/upload/v1723636325/Frame_274_laat6v.png"
                alt="website logo"
              />
            </Link>

            <h1 className="nav-heading">Tasty Kitchens</h1>
          </div>
          <div className="nav-items" id="nav-des">
            <ul className="nav-list">
              <li className="nav-item-home">
                <Link to="/" className="link-item">
                  Home
                </Link>
              </li>
              <li className="nav-item-cart">
                <Link to="/cart" className="link-item">
                  Cart
                </Link>
              </li>
            </ul>
            <button className="logout-button" onClick={this.onClickLogout}>
              Logout
            </button>
          </div>
          <button className="hamburger-button" onClick={this.onShowNavItems}>
            <GiHamburger className="hamburger-icon" aria-label="menu" />
          </button>
        </div>
        {showNavItems ? this.navItems() : null}
      </nav>
    )
  }

  render() {
    return this.navMobile()
  }
}

export default withRouter(Header)
