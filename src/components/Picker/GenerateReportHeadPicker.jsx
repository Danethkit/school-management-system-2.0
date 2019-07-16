import React from "react";
import CoursePicker from "./CoursePicker";
import SemesterPicker from "./SemesterPicker";
import BatchPicker from "./BatchPicker";
import GroupPicker from "./GroupPicker";
import StartDatePicker from "./StartDatePicker";
import EndDatePicker from "./EndDatePicker";
import { Box, Grid } from "@material-ui/core";


export default function GenerateReportHeadPicker(props) {
    return (
        <Box display='flex' boxShadow={3}>
            <Grid container spacing={10} style={{padding:50}}>
                <Grid item sm >
                    <CoursePicker />
                    <BatchPicker />
                </Grid>
                <Grid item sm >
                    <SemesterPicker/>
                    <GroupPicker />
                </Grid>
                <Grid item sm >
                    <StartDatePicker {...props}/>
                    <EndDatePicker {...props}/>
                </Grid>
            </Grid>
        </Box>
    );
}