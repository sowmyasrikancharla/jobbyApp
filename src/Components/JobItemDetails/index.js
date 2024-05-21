import {Component} from 'react'
import Cookie from 'js-cookie'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemDetails: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        packagePerAnnum: jobDetails.package_per_annum,
        skills: jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
      }
      const similarJobsDetails = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetails: updatedJobDetails,
        similarJobs: similarJobsDetails,
      })
    }
    if (response.status !== 200) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobItemDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobItemDetails
    console.log(similarJobs)
    return (
      <div>
        <Header />
        <li className="job-item-details-con">
          <div className="job-item-con">
            <div className="flex-con">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
              <div>
                <h1 className="employment-heading">{title}</h1>
                <div className="flex-con">
                  {' '}
                  <FaStar className="star-icon" />
                  <p className="employment-heading"> {rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-con">
              <div className="location-internship-con">
                <div className="flex-con">
                  <MdLocationOn className="location-internship-icon" />
                  <p className="location-internship-text">{location}</p>
                </div>
                <div className="flex-con">
                  <FaSuitcase className="location-internship-icon" />
                  <p className="location-internship-text">{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="line" />
            <div className="visit-con">
              <h1 className="filter-group-heading">Description</h1>
              <a href={companyWebsiteUrl} className="company-link">
                Visit
                <FiExternalLink className="external-link-logo" />
              </a>
            </div>
            <p className="job-description-text">{jobDescription}</p>
            <h1 className="filter-group-heading">Skills</h1>
            <ul className="skills-con">
              {skills.map(eachSkill => (
                <div className="skill-icon-name-con">
                  <img src={eachSkill.imageUrl} alt={eachSkill.name} />
                  <p className="job-description-text">{eachSkill.name}</p>
                </div>
              ))}
            </ul>
            <h1 className="filter-group-heading">Life at Company</h1>
            <div className="life-at-company-con">
              <p className="life-text">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                className="image"
                alt="life at company"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="all-similar-jobs-con">
            {similarJobs.map(eachJob => (
              <SimilarJobs similarJobsDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </li>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div>
      <Header />
      <div className="failure-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          alt="failure view"
        />
        <h1 className="failure-heading">OOps! Something Went Wrong</h1>
        <p className="failure-text">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="retry-button" onClick={this.onClickRetryButton}>
          Retry
        </button>
      </div>
    </div>
  )

  renderLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
}
export default JobItemDetails
