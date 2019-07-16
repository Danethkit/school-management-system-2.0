import React from "react";
import { connect } from "react-redux";
import AttendanceLineTable from "../Table/AttendanceLineTable";
import SearchBox from "../Attendance/SearchBox";
import LinearProgress from "@material-ui/core/LinearProgress";

const AttendanceLine = ({ attendanceLine }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: 1400
      }}
    >
      <h1>Attendance Line</h1>
      {attendanceLine.length === 0 ? <LinearProgress /> : null}
      <SearchBox />
      <br />
      <AttendanceLineTable />
    </div>
  );
};
export default connect(state => ({
  attendanceLine: state.initData.attendanceLine
}))(AttendanceLine);
