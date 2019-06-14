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
    <Box boxShadow={2} display={'flex'} >
      <Grid container>
        <Grid container item xs={12} >

          <Grid item xs={3} style={{paddingRight:25, paddingLeft:2}}>
            <DatePicker />
          </Grid>
          <Grid item xs={3} style={{paddingRight:25, paddingLeft:25}}>
            <FacultyPicker />
          </Grid>
          <Grid item xs={3} style={{paddingRight:25, paddingLeft:25}}>
            <CoursePicker />
          </Grid>
          <Grid item xs={3} style={{paddingLeft:25, paddingRight:2}}>
            <BatchPicker />
          </Grid>

        </Grid>

        <Grid container item xs={12}>

          <Grid item xs={3} style={{paddingRight:25, paddingLeft:2}}>
            <SessionPicker />
          </Grid>
          <Grid item xs={3} style={{paddingRight:25, paddingLeft:25}}>
            <SubjectPicker />
          </Grid>
          <Grid item xs={3} style={{paddingRight:25, paddingLeft:25}}>
            <SemesterPicker />
          </Grid>
          <Grid item xs={3} style={{paddingLeft:25,paddingRight:2}}>
            <GroupPicker />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
