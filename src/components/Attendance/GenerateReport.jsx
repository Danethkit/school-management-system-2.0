import React from "react";
import GenerateReportHeadPicker from "../Picker/GenerateReportHeadPicker";
import GenerateReportTable from "../Table/GenerateReportTable";
import AttendanceReportDailog from '../Alert/AttendanceReportDialog'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'

function GenerateReport  (props)  {
    return <div
          style={{
            flexGrow: 1,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            maxWidth: 1400
          }}
        >

        <div style={{margin:'auto', width:'40vh', marginBottom:10}}><Typography variant='h4'>Generate Report</Typography></div>
        <GenerateReportHeadPicker {...props} />
        <GenerateReportTable {...props}/>
        <AttendanceReportDailog {...props}/>
    </div>
}
export default connect(state => ({
    endDate: state.changePicker.endDate,
    startDate: state.changePicker.startDate,
    printReportLoading: state.changePicker.printReportLoading,
    batch: state.changePicker.batch,
    group: state.changePicker.group,
    semester: state.changePicker.semester,
    course: state.changePicker.course,
    attendanceReportData: state.initData.attendanceReportData,
    studentData : state.initData.studentData,
    subjectInfo : state.initData.subjectInfo,
}))(GenerateReport)
