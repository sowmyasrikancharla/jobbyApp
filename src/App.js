import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import ProtectedRoute from './Components/ProtectedRoute'
import JobItemDetails from './Components/JobItemDetails'
import DesignedBy from './Components/DesignedBy'
import NotFound from './Components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.
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

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute
          exact
          path="/jobs"
          component={Jobs}
          employmentTypesList={this.employmentTypesList}
        />
        <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/designed-by" component={DesignedBy} />
        <ProtectedRoute exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}
export default App
