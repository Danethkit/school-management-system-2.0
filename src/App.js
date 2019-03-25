import React from 'react'
import './index.css'
import TimebTableScreen from './screen/TimeTableScreen'
import AttendancesScreen from './screen/AttendancesScreen'
import { Route, Switch, Router } from "react-router-dom"
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import NavigationBar from "./components/NavigationBar/Navigator"
const hist = createBrowserHistory()

export default () => (
    <>
        <Router history={hist}>
          <Route path='/' component={NavigationBar} />
          <Switch>
            <Route path='/attendances' component={AttendancesScreen}/>
            <Route path='/timetables' component={TimebTableScreen} />
          </Switch>
        </Router>
    </>
)

serviceWorker.register();