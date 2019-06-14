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
        <Grid container  spacing={10}  style={{marginBottom:2, marginTop:8}} justify='center' >

          <Grid item sm ><DatePicker /></Grid>

          <Grid item sm ><FacultyPicker /></Grid>

          <Grid item sm ><CoursePicker /></Grid>

          <Grid item sm><BatchPicker /></Grid>

          <Grid item sm ><SessionPicker /></Grid>

          <Grid item sm ><SubjectPicker /></Grid>

          <Grid item sm ><SemesterPicker /></Grid>

          <Grid item sm ><GroupPicker /></Grid>

        </Grid>

      </Grid>
    </Box>





  );
}
