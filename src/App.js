import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import './index.css'
import AttendancesScreen from './screen/AttendancesScreen'
import TimeTable from './screen/TimeTable'
import { Route, Switch, Router } from "react-router-dom"
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import NavigationBar from "./components/NavigationBar/Navigator"
import { ThemeProvider } from '@material-ui/styles';
import {theme} from '../src/constants/color'
import {getSubjectData, requestUserIdentity} from './redux/ActionCreator/apiRequest'
const hist = createBrowserHistory()

const App = ({dispatch}) => {
  const uid = localStorage.getItem('uid')
  useEffect(() => {
    dispatch(getSubjectData())
  }, [])
   return <>
    <ThemeProvider theme={theme}>
        <Router history={hist}>
          <Route path='/' component={NavigationBar} />
          <Switch>
            <Route path = '/sms/attendances' component={AttendancesScreen}/>
            <Route path='/sms/timetable' component={TimeTable} />
            {/*<Route path='/timetables/timetable_report' component={TimetableReport}/>*/}
            <Route component={AttendancesScreen}/>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
}
export default connect()(App)


serviceWorker.register();