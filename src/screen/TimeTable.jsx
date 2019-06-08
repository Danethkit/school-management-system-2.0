import React from "react";
import { Route, Switch } from "react-router-dom"
import AdminGenerateTimeTable from '../components/Timetable/AdminGenerateTimetable'
import AdminTimeTableView from '../components/Timetable/AdminTimetableView'
import FacultyTimeTable from '../components/Timetable/FacultyTimetableView'
import StudentTimeTableView from '../components/Timetable/StudentTimetableView'


const AttendanceScreen = () => {

  let route = '/timetables'
  return <Switch>
      <Route path = {`${route}/admin-view`} component={AdminTimeTableView} />
      <Route path = {`${route}/admin-create`} component={AdminGenerateTimeTable} />
      <Route path = {`${route}/student`} component={FacultyTimeTable} />
      <Route path = {`${route}/faculty`} component={StudentTimeTableView} />
      <Route  component={AdminGenerateTimeTable} />
  </Switch>
}
export default AttendanceScreen
