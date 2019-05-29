import React from "react";
import { connect } from 'react-redux'
import AttendanceLineTable from "../Table/AttendanceLineTable";
import SearchBox from '../Attendance/SearchBox'
import LinearProgress from '@material-ui/core/LinearProgress';


const AttendanceLine = ({attendanceLine}) => {
      console.log('attendance line')
      return <>
        <h1>Attendance Line</h1>
        {
          attendanceLine.length==0 ? <LinearProgress /> : null
        }        
        <SearchBox />
        <br/>
        <AttendanceLineTable/>
      </>}
export default connect(state =>({attendanceLine: state.initData.attendanceLine,
}))(AttendanceLine)
