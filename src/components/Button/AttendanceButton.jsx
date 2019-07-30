import React from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";

const AttendanceButton = ({onClick}) =>{
  return <>
  <Grid container justify="flex-end" alignItems="flex-end" data-test="Grid">
  <Button color="primary" onClick={onClick} style={{margin:'10px'}}variant="contained" data-test="Button"> Save </Button>
  </Grid>
  </>
}
export default AttendanceButton
