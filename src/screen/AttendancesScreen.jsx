import React from "react";
import AttendancesSheet from '../components/Attendance/AttendanceSheet'
import AttendanceLine from '../components/Attendance/AttendanceLine'
import GenerateAttendance from '../components/Attendance/GenerateAttendance'
import GenerateReport from '../components/Attendance/GenerateReport'
import AttendanceResult from '../components/Attendance/AttendanceResult'
import { Route, Switch } from "react-router-dom"

const AttendanceScreen = () => {

  let route = '/attendance'
  return <Switch>
      <Route path = {`${route}/attendance_line`} component={AttendanceLine} />
      <Route path = {`${route}/generate_attendance`} component={GenerateAttendance} />
      <Route path = {`${route}/attendance_result`} component={AttendanceResult} />
      <Route path = {`${route}/generate_report`} component={GenerateReport} />
      <Route path = {`${route}/attendance_sheet`} component={AttendancesSheet} />
      <Route  component={AttendancesSheet} />
  </Switch>
}
export default AttendanceScreen
