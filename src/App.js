import React, { Component } from 'react'
import './index.css'
import TimebTableScreen from './components/Timetable/AdminTimetableView'
import AttendancesScreen from './screen/AttendancesScreen'
import { Route, Switch, Router } from "react-router-dom"
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import NavigationBar from "./components/NavigationBar/Navigator"
import AttendanceLine from './components/Attendance/AttendanceLine';
import GenerateAttendance from './components/Attendance/GenerateAttendance';
import AttendanceResult from './components/Attendance/AttendanceResult';
import GenerateReport from './components/Attendance/GenerateReport'
import AdminGenerateTimetable from "./components/Timetable/AdminGenerateTimetable";
import TimetableReport from "./components/Timetable/TimetableReport";
import StudentTimetableView from "./components/Timetable/StudentTimetableView";
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
            <Route path='/timetables/generate_timetable' component={AdminGenerateTimetable} />
            <Route path='/timetables/timetable_report' component={TimetableReport}/>
            <Route path='/timetables/timetable_view' component={TimebTableScreen}/>
            <Route path='/timetables/student_timetable_view' component={StudentTimetableView}/>
          </Switch>
        </Router>
    </>
)



serviceWorker.register();