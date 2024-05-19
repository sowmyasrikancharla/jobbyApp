import {Component} from 'react'
import Cookie from 'js-cookie'
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
  state = {apiStatus: apiStatusConstants.initial, jobsDetails: []}

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
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
        apiStatus: apiStatusConstants.success,
        jobsDetails: formattedJobsDetails,
      })
    }
    if (response.status !== 200) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {jobsDetails} = this.state
    console.log(jobsDetails)
    return (
      <div>
        {' '}
        <Header />
        <div className="jobs-bg-con">
          <div className="profile-jobs-filtering-left-con">
            <Profile />
            <hr />
            <ul>
              <h2 className="filter-group-heading">Types of Employment</h2>
              {employmentTypesList.map(eachEmployment => (
                <li className="list">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={eachEmployment.employmentTypeId}
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
                    className="checkbox"
                    id={eachSalary.salaryRangeId}
                  />
                  <label id={eachSalary.salaryRangeId} className="label-text">
                    {eachSalary.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <ul className="jobs-display-right-con">
            {jobsDetails.map(eachJob => (
              <JobItem key={eachJob.id} jobItemDetails={eachJob.jobsDetails} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jobs
