import React from 'react';
import GenerateReportHeadPicker from "../Picker/GenerateReportHeadPicker";
import GenerateReportTable from "../Table/GenerateReportTable";
export default function GenerateReport  ()  {
            return <>
                <h1>Generate Report</h1>
                <GenerateReportHeadPicker />
                <GenerateReportTable />
            </>
}