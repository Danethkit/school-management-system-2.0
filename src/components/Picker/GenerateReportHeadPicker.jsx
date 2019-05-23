import React from "react";
import CoursePicker from "./CoursePicker";
import SemesterPicker from "./SemesterPicker";
import BatchPicker from "./BatchPicker";
import GroupPicker from "./GroupPicker";
import StartDatePicker from "./StartDatePicker";
import EndDatePicker from "./EndDatePicker";
import { Card, CardContent, Grid } from "@material-ui/core";


export default function GenerateReportHeadPicker() {
    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container spacing={16}>
                        <Grid item sm>
                            <CoursePicker />
                            <SemesterPicker />
                        </Grid>
                        <Grid item sm>
                            <BatchPicker />
                            <GroupPicker />
                        </Grid>
                        <Grid item sm>
                            <StartDatePicker/>
                            <EndDatePicker />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}