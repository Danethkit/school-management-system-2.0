import React from "react";
import CoursePicker from "./CoursePicker";
import SemesterPicker from "./SemesterPicker";
import BatchPicker from "./BatchPicker";
import GroupPicker from "./GroupPicker";
import StartDatePicker from "./StartDatePicker";
import EndDatePicker from "./EndDatePicker";
import { Card, Grid } from "@material-ui/core";


export default function GenerateReportHeadPicker() {
    return (
        <Card>
            <Grid container spacing={10}>
                <Grid item sm container>
                    <CoursePicker />
                    <BatchPicker />
                </Grid>
                <Grid item sm container>
                    <SemesterPicker />
                    <GroupPicker />
                </Grid>
                <Grid item sm container>
                    <StartDatePicker/>
                    <EndDatePicker />
                </Grid>
            </Grid>
        </Card>
    );
}