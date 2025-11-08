import {Component} from 'react'
import {MdOutlineSort} from 'react-icons/md'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class PopularRestaurants extends Component {
  state = {
    sortOption: sortByOptions[1].value,
    limit: 9,
    page: 1,
    restaurantsDataList: [],
    restaurantsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularRestaurantsData()
  }

  renderLoader = () => (
    <div data-testid="restaurants-list-loader" className="restaurants-loader">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  onBackwardPage = () => {
    const {page} = this.state
    if (page > 1) {
      this.setState(
        pre => ({page: pre.page - 1}),
        this.getPopularRestaurantsData,
      )
    }
  }

  onForwardPage = () => {
    const {page} = this.state
    if (page <= 3) {
      this.setState(
        pre => ({page: pre.page + 1}),
        this.getPopularRestaurantsData,
      )
    }
  }

  onToggleSortOption = event => {
    this.setState(
      {sortOption: event.target.value},
      this.getPopularRestaurantsData,
    )
  }

  getPopularRestaurantsData = async () => {
    this.setState({restaurantsApiStatus: apiStatusConstants.inProgress})
    const {sortOption, limit, page} = this.state
    const offset = (page - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        hasOnlineDelivery: eachItem.has_online_delivery,
        userRating: {
          ratingText: eachItem.user_rating.rating_text,
          ratingColor: eachItem.user_rating.rating_color,
          totalReviews: eachItem.user_rating.total_reviews,
          rating: eachItem.user_rating.rating,
        },
        name: eachItem.name,
        hasTableBooking: eachItem.has_table_booking,
        isDeliveringNow: eachItem.is_delivering_now,
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        menuType: eachItem.menu_type,
        location: eachItem.location,
        opensAt: eachItem.opens_at,
        groupByTime: eachItem.group_by_time,
      }))
      this.setState({
        restaurantsDataList: updatedData,
        restaurantsApiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRestaurantsView = () => {
    const {sortOption, restaurantsDataList, page} = this.state
    return (
      <div className="popular-restaurants-container">
        <div className="popular-restaurants">
          <h1 className="popular-restaurants-title">Popular Restaurants</h1>
          <div className="sort-container">
            <p className="popular-restaurants-text">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-controller">
              <MdOutlineSort />
              <p className="sort-by">Sort By</p>
              <select
                className="sort-by"
                value={sortOption}
                onChange={this.onToggleSortOption}
              >
                {sortByOptions.map(each => (
                  <option key={each.id} value={each.value}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul className="restaurants-items-container">
            {restaurantsDataList.map(item => (
              <RestaurantItem restaurantData={item} key={item.id} />
            ))}
          </ul>
        </div>
        <div className="page-controller">
          <button
            data-testid="pagination-left-button"
            className="page-controller-btn"
            type="button"
            onClick={this.onBackwardPage}
          >
            <IoIosArrowBack aria-label="back" />
          </button>
          <div>
            <p>
              <span data-testid="active-page-number">{page}</span> of 4
            </p>
          </div>
          <button
            data-testid="pagination-right-button"
            className="page-controller-btn"
            type="button"
            onClick={this.onForwardPage}
          >
            <IoIosArrowForward aria-label="forward" />
          </button>
        </div>
      </div>
    )
  }

  renderView = () => {
    const {restaurantsApiStatus} = this.state
    switch (restaurantsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantsView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderView()}</>
  }
}

export default PopularRestaurants
