import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class OffersList extends Component {
  state = {offersList: [], offersApiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOffersList()
  }

  getOffersList = async () => {
    this.setState({offersApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.offers.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))
    if (response.ok) {
      this.setState({
        offersList: updatedData,
        offersApiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSlick = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(each => (
            <li key={each.id} className="offers-list-item">
              <img className="offersImg" src={each.imageUrl} alt="offer" />
            </li>
          ))}
        </Slider>
      </div>
    )
  }

  renderOffersLoadingView = () => (
    <div className="loader-container" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderOffers = () => {
    const {offersApiStatus} = this.state
    switch (offersApiStatus) {
      case apiStatusConstants.success:
        return this.renderSlick()
      case apiStatusConstants.inProgress:
        return this.renderOffersLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderOffers()
  }
}

export default OffersList
