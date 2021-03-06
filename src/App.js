import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import CalendarsContainer from './components/CalendarsContainer'
import CreateCalendar from './components/CreateCalendar'
// import EditCalendar from './components/EditCalendar'
import NewUserRegister from './components/NewUserRegister'
import AddEmployeeToCalendar from './components/AddEmployeeToCalendar'
import ShiftSelection from './components/ShiftSelection'
// import WeekView from './components/WeekView'
import UpdateProfile from './components/UpdateProfile'
import DayView from './components/DayView'
import RequestPasswordReset from './components/RequestPasswordReset'
import ResetPassword from './components/ResetPassword'
import SingleShiftView from './components/SingleShiftView'
import ManagerApproveSwap from './components/ManagerApproveSwap'
// import AcceptShiftRequest from './components/AcceptShiftRequest'
import Notes from './components/Notes'
import AvailabilityResponse from './components/AvailabilityRespnse'
import MyShifts from './components/MyShifts'
// import ReqAvailAndCopyPasteDate from './components/ReqAvailAndCopyPasteDate'
import Header from './components/Header'
import DayAlerts from './components/DayAlerts'
import api from './components/api'
import WeekViewContainer from './components/WeekViewContainer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.setNewUser = this.setNewUser.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }
  setNewUser (user) {
    window.localStorage.setItem('token', `${user}`)
    this.setState({ currentUser: user })
  }
  setCurrentUser (user) {
    window.localStorage.setItem('token', `${user.token}`)
    this.setState({ currentUser: user })
  }
  onLogout () {
    api.setUserToken(null)
    window.localStorage.clear('token')
    this.setState({ currentUser: false })
  }

  render () {
    if (this.state.currentUser === null || this.state.currentUser === false) {
      console.log(this.state.currentUser)
      return (
        <Router>
          <div className='App'>
            <main className='main'>
              <div className='board'>

                <Route exact path='/Login' render={(props) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                    <Login setCurrentUser={this.setCurrentUser} />
                  </Guard>} />

                <Route exact path='/Register' render={(props) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                    <Register setCurrentUser={this.setCurrentUser} />
                  </Guard>} />

                <Route path='/RequestNewPassword' render={(match) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/Login'>
                    <RequestPasswordReset setCurrentUser={this.setCurrentUser} />
                  </Guard>} />

                <Route path='/Password/Reset/:token' render={(match) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/Login'>
                    <ResetPassword token={match.params.token} />
                  </Guard>} />

                <Route path='/calendars/:id/availability_response/:token' render={({ match }) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                    <AvailabilityResponse id={match.params.id} token={match.params.token} />
                  </Guard>} />

                <Route path='/complete/:token' render={({ match }) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                    <ManagerApproveSwap token={match.params.token} />
                  </Guard>} />

                <Route path='/welcome/:id' render={({ match }) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                    <NewUserRegister setNewUser={this.setNewUser}
                      id={match.params.id} />
                  </Guard>} />

              </div>
            </main>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div className='App'>
            <main className='main'>
              <div className='board'>
                <Route path='/Login' render={(props) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                    <Login setCurrentUser={this.setCurrentUser} />
                  </Guard>} />

                <Header onLogout={this.onLogout} />

                <Route path='/Register' render={(props) =>
                  <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                    <Register setCurrentUser={this.setCurrentUser} />
                  </Guard>} />
                <div>

                  <Route exact path='/Calendar/:id/AddEmployee' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/Login'>
                      <AddEmployeeToCalendar id={match.params.id} />
                      <ShiftSelection id={match.params.id} />
                    </Guard>} />

                  <Route exact path='/Calendar/:id/EditCalendar' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/Login'>
                      <AddEmployeeToCalendar id={match.params.id} />
                      <CreateCalendar id={match.params.id} />
                    </Guard>} />

                  <Route path='/CalendarList' render={(props) =>
                    <Guard condition={this.state.currentUser} redirectTo='/Login'>
                      <CalendarsContainer setCurrentUser={this.setCurrentUser} />
                      <MyShifts setCurrentUser={this.setCurrentUser} />
                    </Guard>} />

                  <Route path='/CreateCalendar' render={({ props }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/Login'>
                      <CreateCalendar onLogout={this.onLogout} />
                    </Guard>} />

                  <Route exact path='/Calendar/:id/AddShifts/' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <ShiftSelection id={match.params.id} />
                    </Guard>} />

                  <Route path='/Calendar/:id/EditShifts/:shiftID' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <ShiftSelection shiftID={match.params.shiftID} id={match.params.id} />
                    </Guard>} />

                  <Route path='/Calendar/:id/shifts/:date' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <Notes id={match.params.id} date={match.params.date} />
                      <DayAlerts id={match.params.id} date={match.params.date} />
                      <DayView id={match.params.id} date={match.params.date} />
                    </Guard>} />

                  <Route path='/Calendar/:id/AddStaff' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <AddEmployeeToCalendar id={match.params.id} date={match.params.date} />
                    </Guard>} />

                  <Route exact path='/Calendar/:id/Type/:type' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <WeekViewContainer id={match.params.id} type={match.params.type} />
                    </Guard>} />

                  <Route path='/calendars/:id/shifts/:shiftid/usershifts' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <SingleShiftView id={match.params.id} type={match.params.type} shiftsId={match.params.shiftid} />
                    </Guard>} />

                  <Route path='/Calendar/UpdateProfile' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <UpdateProfile id={match.params.id} />
                    </Guard>} />

                </div>
              </div>
            </main>
          </div>
        </Router>
      )
    }
  }
}
const Guard = ({ redirectTo, condition, children }) => {
  if (condition) {
    return children
  } else {
    return <Redirect to={redirectTo} />
  }
}

export default App
