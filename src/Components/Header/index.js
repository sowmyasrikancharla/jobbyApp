import {Component} from 'react'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    console.log('logout')
  }
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
          <p className="header-nav-text">Jobs</p>
        </div>
        <button className="logout-button" onClick={this.onClickLogout}>
          Logout
        </button>
      </div>
    )
  }
}
export default Header
