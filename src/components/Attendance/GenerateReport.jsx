import React from "react";
import GenerateReportHeadPicker from "../Picker/GenerateReportHeadPicker";
import GenerateReportTable from "../Table/GenerateReportTable";
import AttendanceReportDailog from "../Alert/AttendanceReportDialog";
export default function GenerateReport() {
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
      <h2>Generate Report</h2>
      <GenerateReportHeadPicker />
      <GenerateReportTable />
      <AttendanceReportDailog />
    </div>
  );
}
