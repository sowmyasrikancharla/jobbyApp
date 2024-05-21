import {Component} from 'react'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

class JobItem extends Component {
  render() {
    const {jobItemDetails} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemDetails
    return (
      <Link to={`/jobs/${id}`} className="link">
        <li className="job-item-con">
          <div className="flex-con">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
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
          <h1 className="filter-group-heading">Description</h1>
          <p className="job-description-text">{jobDescription}</p>
        </li>
      </Link>
    )
  }
}
export default JobItem
