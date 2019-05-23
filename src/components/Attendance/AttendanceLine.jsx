import React from "react";
import AttendanceLineTable from "../Table/AttendanceLineTable";
import SearchBox from '../Attendance/SearchBox'

const AttendanceLine = () => (
      <>
        <h1>Attendance Line</h1>
        <SearchBox />
        <br/>
        <AttendanceLineTable/>
      </>);
export default AttendanceLine 
