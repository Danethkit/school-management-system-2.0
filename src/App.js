import React, { Component } from 'react'
import './index.css'
import TimebTableScreen from './components/Timetable/AdminTimetableView'
import AttendancesScreen from './screen/AttendancesScreen'
import { Route, Switch, Router } from "react-router-dom"
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import NavigationBar from "./components/NavigationBar/Navigator"
import AdminGenerateTimetable from "./components/Timetable/AdminGenerateTimetable";
import TimetableReport from "./components/Timetable/TimetableReport";
import StudentTimetableView from "./components/Timetable/StudentTimetableView";
import FacultyTimetableView from "./components/Timetable/FacultyTimetableView";
const hist = createBrowserHistory()

export default () => (
    <>
        <Router history={hist}>
          <Route path='/' component={NavigationBar} />
          <Switch>
            <Route path = '/attendances' component={AttendancesScreen}/>
            <Route path='/timetables' component={AdminGenerateTimetable} />
            {/*<Route path='/timetables/timetable_report' component={TimetableReport}/>*/}
            <Route component={AttendancesScreen}/>
          </Switch>
        </Router>
    </>
)



serviceWorker.register();