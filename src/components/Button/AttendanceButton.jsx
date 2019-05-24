import React from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";

const AttendanceButton = ({onClick}) =>{
  return <>
  <Grid container justify="flex-end" alignItems="flex-end">
  <Button
      color="secondary"
      variant="outlined"
      onClick={onClick}
    >
      Save
    </Button>
  </Grid>
  </>
}
export default AttendanceButton
