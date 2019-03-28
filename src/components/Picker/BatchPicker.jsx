import React, { Component } from "react";
import {
  MenuItem,
  TextField,
  InputAdornment,
  withStyles
} from "@material-ui/core/";
import classNames from "classnames";
import { connect } from 'react-redux'
import { onBatchChange } from '../../action'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textFile: {
    fontSize: 14
  }
});

class BatchPicker extends Component {

  render() {
    const { classes, dispatch, changeBatch, requestStudentData } = this.props;
    const allBatch = Object.keys(requestStudentData.studentData).sort((a, b)=> a.split(" ")[1] - b.split(" ")[1])
    return (
      <>
        <TextField
          select
          fullWidth
          autoFocus
          className={classNames(classes.margin, classes.textField)}
          value={changeBatch.batch}
          onChange={(event)=> {dispatch(onBatchChange(event.target.value))}}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>Batch:</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {allBatch.map(e => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }
}
export default connect(state => state)(withStyles(styles)(BatchPicker))