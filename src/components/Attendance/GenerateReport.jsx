import React, { Component } from 'react';
import GenerateReportHeadPicker from "../Picker/GenerateReportHeadPicker";
import GenerateReportTable from "../Table/GenerateReportTable";
export default class GenerateReport extends Component{
    render(){
        return(
            <div>
                <h1>Generate Report</h1>
                <GenerateReportHeadPicker />
                <GenerateReportTable />
            </div>
        )
    }
}