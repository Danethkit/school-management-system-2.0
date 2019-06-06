import React from "react";
import DatePicker from "./DatePicker";
import SessionPicker from "./SessionPicker";
import CoursePicker from "./CoursePicker";
import SemesterPicker from "./SemesterPicker";
import BatchPicker from "./BatchPicker";
import GroupPicker from "./GroupPicker";
import SubjectPicker from "./SubjectPicker";
import FacultyPicker from "./FacultyPicker";
import {Grid, Box } from "@material-ui/core";


export default function HeadPicker() {
  return (
    <Box boxShadow={2} display='flex' >
          <Grid container spacing={10} >
            <Grid item sm container>
              <DatePicker />
              <SessionPicker />
            </Grid>
            <Grid item sm  container>
              <FacultyPicker />
              <SubjectPicker />
            </Grid>
            <Grid item sm container>
              <CoursePicker />
              <SemesterPicker />
            </Grid>
            <Grid item sm container >
              <BatchPicker />
              <GroupPicker />
            </Grid>
          </Grid>
    </Box>
  );
}
