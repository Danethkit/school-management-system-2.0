import React from "react";
import CoursePicker from "../../Picker/CoursePicker";
import SemesterPicker from "../../Picker/SemesterPicker";
import BatchPicker from "../../Picker/BatchPicker";
import GroupPicker from "../../Picker/GroupPicker";
import StartDatePicker from "../../Picker/StartDatePicker";
import EndDatePicker from "../../Picker/EndDatePicker";
import { Box, Grid } from "@material-ui/core";
import WeekPicker from "../../Timetable/Genereate TimeTable/TimeTableSearchBox";


export default function GenerateReportHeadPicker(props) {
    return (
        <Box boxShadow={2} display={"flex"}>
            <Grid
                container
                justify="center"
                style={{ marginLeft: 20, marginRight: 20 }}
            >
            <Grid
                item
                container
                spacing={10}
                style={{ marginBottom: 2, marginTop: 8 }}
                justify="flex-start"
                alignItems="center"
            >
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <CoursePicker />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <BatchPicker />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <SemesterPicker />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <GroupPicker />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <StartDatePicker {...props}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <EndDatePicker {...props}/>
                </Grid>
            </Grid>
        </Grid>
    </Box>



    );
}