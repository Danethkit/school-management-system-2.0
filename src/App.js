import React, { Component } from 'react'
import './index.css'
import TimebTableScreen from './screen/TimeTableScreen'
import AttendancesScreen from './screen/AttendancesScreen'
import { Route, Switch, Router } from "react-router-dom"
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import NavigationBar from "./components/NavigationBar/Navigator"
import AttendanceLine from './components/Attendance/AttendanceLine';
import GenerateAttendance from './components/Attendance/GenerateAttendance';
import AttendanceResult from './components/Attendance/AttendanceResult';
import GenerateReport from './components/Attendance/GenerateReport'
const hist = createBrowserHistory()

export default () => (
    <>
        <Router history={hist}>
          <Route path='/' component={NavigationBar} />
          <Switch>
            <Route exact path='/attendances' component={AttendancesScreen}/>
            <Route path='/attendances/attendance_sheet' component={AttendancesScreen}/>
            <Route path='/attendances/attendance_lines' component={AttendanceLine} />
            <Route path='/attendances/generate_attendance' component={GenerateAttendance} />
            <Route path='/attendances/attendance_result' component={AttendanceResult} />
            <Route path='/attendances/generate_report' component={GenerateReport} />
            <Route path='/timetables' component={TimebTableScreen} />
          </Switch>
        </Router>
    </>
)


class App extends Component {
  render() {
    return  <>
            <Router history={hist} >
              <Route path='/' component={NavigationBar} />
              <Switch>
                <Route exact path='/attendances' component={AttendancesScreen}/>
                <Route path='/attendances/attendances_sheet' component={AttendancesScreen}/>
                <Route path='/attendances/attendances_line' component={AttendanceLine} />
                <Route path='/attendances/generate_attendances' component={GenerateAttendance} />
                <Route path='/attendances/attendances_result' component={AttendanceResult} />
                <Route path='/timetables' component={TimebTableScreen} />
              </Switch>
            </Router>
            </>
  }
}
export default App
serviceWorker.register();