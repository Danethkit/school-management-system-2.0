import React from "react";
import CoursePicker from "../Picker/CoursePicker";
import BatchPicker from "../Picker/BatchPicker";
import GroupPicker from "../Picker/GroupPicker";
import SemesterPicker from "../Picker/SemesterPicker";
import WeekPicker from "../Picker/WeekPicker";
import { Grid, Box } from "@material-ui/core";

const TimeTableSearchBox = ({value, setWeekNumber}) => {
  return (
    <Box boxShadow={3} display='flex'>
      <Grid container spacing={10} style={{padding:20}} justify='center' >
        <Grid  item sm><CoursePicker /></Grid>
        <Grid  item sm><BatchPicker/></Grid>
        <Grid  sm item><SemesterPicker/></Grid>
        <Grid  sm item><GroupPicker/></Grid>
        <Grid  sm item><WeekPicker name="week" value={value} onChange={setWeekNumber}/></Grid>
      </Grid>
    </Box>)
}
export default TimeTableSearchBox
