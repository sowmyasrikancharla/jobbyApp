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
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        alt="website logo"
        className="website-logo-header"
      />
      <div className="home-jobs-con">
        <p className="header-nav-text">Home</p>
        <Link to="/jobs" className="link">
          {' '}
          <p className="header-nav-text">Jobs</p>
        </Link>
      </div>
      <button className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
