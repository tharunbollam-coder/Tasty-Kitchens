import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import OffersList from '../OffersList'

import PopularRestaurants from '../PopularRestaurants'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <OffersList />
        <PopularRestaurants />
        <Footer />
      </div>
    )
  }
}

export default Home
