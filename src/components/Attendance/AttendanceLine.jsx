import React, { Component } from "react";
import AttendanceLineTable from "../Table/AttendanceLineTable";

export default class AttendanceLine extends Component {
  render() {
    return (
      <div>
        <h1>Attendance Line</h1>
        <AttendanceLineTable/>
      </div>
    );
  }
}
