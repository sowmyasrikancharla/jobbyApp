import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-con">
      <Link to="/" className="website-logo-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
        />
      </Link>
      <ul className="home-jobs-con">
        <Link to="/" className="link">
          <li className="header-nav-text">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="header-nav-text">Jobs</li>
        </Link>
        <Link to="/designed-by" className="link">
          <li className="header-nav-text">Designed By</li>
        </Link>
      </ul>
      <li className="logout-button">
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </div>
  )
}
export default withRouter(Header)
