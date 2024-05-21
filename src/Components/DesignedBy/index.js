import {FaLinkedin, FaGithubSquare} from 'react-icons/fa'

import {FiExternalLink} from 'react-icons/fi'

import './index.css'

const DesignedBy = () => (
  <div className="my-container">
    <div className="border-con">
      <h1 className="my-heading">About me</h1>
      <div className="name-con">
        <p className="text">Name:Sowmya Sri Kancharla</p>
      </div>
      <div>
        <p className="text">
          LinkedIn <FaLinkedin /> :{' '}
          <a
            className="link"
            href="https://www.linkedin.com/in/sowmya-sri-kancharla-47569a299/"
          >
            www.linkedin.com
            <FiExternalLink className="visit-icons" />
          </a>
        </p>
      </div>
      <div>
        <p className="text">
          Github <FaGithubSquare /> :{' '}
          <a className="link" href="https://github.com/sowmyasrikancharla/">
            www.Github.com
            <FiExternalLink className="visit-icons" />
          </a>
        </p>
      </div>
    </div>
  </div>
)

export default DesignedBy
