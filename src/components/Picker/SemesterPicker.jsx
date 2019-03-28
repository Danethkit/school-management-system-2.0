import React, { Component } from "react";
import {
  MenuItem,
  TextField,
  InputAdornment,
  withStyles
} from "@material-ui/core/";
import classNames from "classnames";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textFile: {
    fontSize: 14
  }
});

let id = 0;

function inputSemester(id, semester) {
  id += 1;
  return { id, semester };
}
const semesterData = [
  inputSemester(id, "Semester 1"),
  inputSemester(id, "Semester 2"),
  inputSemester(id, "Semester 3"),
  inputSemester(id, "Semester 4"),
  inputSemester(id, "Semester 5"),
  inputSemester(id, "Semester 6"),
  inputSemester(id, "Semester 7"),
  inputSemester(id, "Semester 8")
];

class SemesterPicker extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  state = {
    Semester: ""
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          select
          fullWidth
          autoFocus
          className={classNames(classes.margin)}
          value={this.state.Semester}
          onChange={this.handleChange("Semester")}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>Semester:</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {semesterData.map(option => (
            <MenuItem key={option.id} value={option.semester}>
              {option.semester}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(SemesterPicker);
