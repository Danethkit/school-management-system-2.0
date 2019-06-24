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


export default function HeadPicker({sessionNumber}) {
  return (
      <Box boxShadow={2} display={'flex'} >
        <Grid container justify='center' style={{marginLeft:20, marginRight:20}}>
          <Grid item container spacing={10}  style={{marginBottom:2,  marginTop:8}} justify='flex-start' alignItems='center'>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}><DatePicker /></Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}><FacultyPicker /></Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}><CoursePicker /></Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}><BatchPicker /></Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} ><SessionPicker sessionNumber={sessionNumber}/></Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} ><SubjectPicker /></Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} ><SemesterPicker /></Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} ><GroupPicker /></Grid>

          </Grid>
        </Grid>
    </Box>
  );
}
