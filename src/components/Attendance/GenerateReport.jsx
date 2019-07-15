import React from 'react';
import GenerateReportHeadPicker from "../Picker/GenerateReportHeadPicker";
import GenerateReportTable from "../Table/GenerateReportTable";
import AttendanceReportDailog from '../Alert/AttendanceReportDialog'
export default function GenerateReport  ()  {
    return <>
        <h2>Generate Report</h2>
        <GenerateReportHeadPicker />
        <GenerateReportTable />
        <AttendanceReportDailog />
    </>
}