import { shallow } from 'enzyme';
import { Route } from 'react-router';
import AttendancesSheet from './Attendance Sheet/AttendanceSheet'
import AttendanceLine from './Attendance Line/AttendanceLine'
import GenerateReport from './Generate Report/GenerateReport'
import AttendancesScreen from './AttendancesScreen'
import React from 'react'
it('renders correct routes', () => {
let route = '/sms/attendance'
  const wrapper = shallow(<AttendancesScreen />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});
  // { 'nurse/authorization' : NurseAuthorization, ... }

  expect(pathMap[`${route}/attendance_line`]).toBe(AttendanceLine);
  expect(pathMap[`${route}/generate_report`]).toBe(GenerateReport);
  expect(pathMap[`${route}/attendance_sheet`]).toBe(AttendancesSheet);
});