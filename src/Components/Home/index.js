import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-contents-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs,salary information,company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <button className="find-jobs-button">Find Jobs</button>
        </div>
      </div>
    )
  }
}
export default Home
