import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {usernameInput: '', passwordInput: '', errorMsg: '', isError: false}

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitCredentials = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, isError: true})
    }
    console.log(data)
  }

  render() {
    const {userName, password, isError, errorMsg} = this.state
    return (
      <div className="login-background-container">
        <div className="login-contents-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.onSubmitCredentials}>
            <label htmlFor="Username" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              className="input-container"
              placeholder="Username"
              id="Username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="Password" className="label-text">
              PASSWORD
            </label>
            <input
              type="text"
              className="input-container"
              placeholder="Password"
              id="Password"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {isError && <p className="error-msg-text">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
