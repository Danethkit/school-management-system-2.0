import React from 'react';
import GenerateReportHeadPicker from "../Picker/GenerateReportHeadPicker";
import GenerateReportTable from "../Table/GenerateReportTable";
import AttendanceReportDailog from '../Alert/AttendanceReportDialog'
import {connect} from 'react-redux'

function GenerateReport  (props)  {
    return <>
        <h1>Generate Report</h1>
        <GenerateReportHeadPicker {...props} />
        <GenerateReportTable {...props}/>
        <AttendanceReportDailog {...props}/>
    </>
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