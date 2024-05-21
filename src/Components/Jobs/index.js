import {Component} from 'react'
import Cookie from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsApiStatus: apiStatusConstants.initial,
    jobsDetails: [],
    searchInput: '',
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const {employmentType, searchInput, salaryRange} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const employTypes = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedJobsDetails = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsApiStatus: apiStatusConstants.success,
        jobsDetails: formattedJobsDetails,
      })
    }
    if (response.status !== 200) {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onSearchEnter = () => {
    this.getJobsDetails()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmploymemtType = event => {
    const {employmentType} = this.state
    const selectedEmploymentType = event.target.value
    if (!employmentType.includes(selectedEmploymentType)) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getJobsDetails,
      )
    }
    if (employmentType.includes(selectedEmploymentType)) {
      const updatedEmploymentType = employmentType.filter(
        each => each !== selectedEmploymentType,
      )
      this.setState(
        {employmentType: updatedEmploymentType},
        this.getJobsDetails,
      )
    }
  }

  onChangeSalary = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsDetails)
  }

  onClickRetryJobs = () => {
    this.getJobsDetails()
  }

  renderSuccessJobsView = () => {
    const {jobsDetails} = this.state
    return (
      <div>
        {jobsDetails.length > 0 ? (
          <ul>
            {jobsDetails.map(eachJob => (
              <JobItem key={eachJob.id} jobItemDetails={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </div>
    )
  }

  renderNoJobsView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-text">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsApiFailureView = () => (
    <div className="failure-jobs-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure-view"
      />
      <h1 className="failure-heading">OOps! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" onClick={this.onClickRetryJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsBasedOnAPiStatus = () => {
    const {jobsApiStatus} = this.state
    console.log(jobsApiStatus)
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessJobsView()
      case apiStatusConstants.failure:
        return this.renderJobsApiFailureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div>
        <Header />
        <div className="jobs-bg-con">
          <div className="profile-jobs-filtering-left-con">
            <Profile />
            <hr />
            <ul>
              <h1 className="filter-group-heading">Type of Employment</h1>
              {employmentTypesList.map(eachEmployment => (
                <li className="list">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={eachEmployment.employmentTypeId}
                    onChange={this.onChangeEmploymemtType}
                    value={eachEmployment.employmentTypeId}
                  />
                  <label
                    id={eachEmployment.employmentTypeId}
                    className="label-text"
                  >
                    {eachEmployment.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <ul>
              <h2 className="filter-group-heading">Salary Range</h2>
              {salaryRangesList.map(eachSalary => (
                <li className="list">
                  <input
                    type="radio"
                    className="radio-button"
                    id={eachSalary.salaryRangeId}
                    name="salaryPerAnnum"
                    onChange={this.onChangeSalary}
                    value={eachSalary.salaryRangeId}
                  />
                  <label id={eachSalary.salaryRangeId} className="label-text">
                    {eachSalary.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <ul className="jobs-display-right-con">
            <div className="input">
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
                data-testid="searchButton"
              />
              <IoSearch className="search-icon" onClick={this.onSearchEnter} />
            </div>
            {this.renderJobsBasedOnAPiStatus()}
          </ul>
        </div>
        <div />
      </div>
    )
  }
}
export default Jobs
