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
<<<<<<< HEAD
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
=======
  render() {
    return (
      <div className="header-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="website-logo-header"
        />
        <div className="home-jobs-con">
          <p className="header-nav-text">Home</p>
>>>>>>> 463fb383c80224163f2ab9733776df5d21a04d33
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
