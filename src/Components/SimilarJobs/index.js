import {Component} from 'react'
import {FaStar, FaSuitcase} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  console.log(similarJobsDetails)
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobsDetails
  return (
    <li className="similar-jobs-con">
      <div className="flex-con">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
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
      <p className="employment-heading">Description</p>
      <p className="job-description-text">{jobDescription}</p>
      <div className="location-internship">
        <div className="flex-con">
          <MdLocationOn className="location-internship-icon" />
          <p className="location-internship-text">{location}</p>
        </div>
        <div className="flex-con">
          <FaSuitcase className="location-internship-icon" />
          <p className="location-internship-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
