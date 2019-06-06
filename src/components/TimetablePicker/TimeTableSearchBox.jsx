import React from "react";
import { withStyles } from "@material-ui/core";
import CoursePicker from "../Picker/CoursePicker";
import BatchPicker from "../Picker/BatchPicker";
import GroupPicker from "../Picker/GroupPicker";
import SemesterPicker from "../Picker/SemesterPicker";
import WeekPicker from "../Picker/WeekPicker";
import { Grid, Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    padding: '4px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    padding: 10,
  },
});

const TimeTableSearchBox = ({classes, value, setWeekNumber}) => {
  return (
    <Paper className={classes.root} elevation={1}>
      <Grid container spacing={10} justify='space-evenly'>
        <Grid container item sm><CoursePicker /></Grid>
        <Grid container sm item><BatchPicker/></Grid>
        <Grid container sm item><SemesterPicker/></Grid>
        <Grid container sm item><GroupPicker/></Grid>
        <Grid container sm item><WeekPicker name="week" value={value} onChange={setWeekNumber}/></Grid>
      </Grid>

    </Paper>)
}
export default withStyles(styles)(TimeTableSearchBox);
