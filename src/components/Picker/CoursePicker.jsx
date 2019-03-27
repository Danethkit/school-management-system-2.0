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

function inputCourse(id, course) {
  id += 1;
  return { id, course };
}
const courseData = [
  inputCourse(id, "Software Engineering"),
  inputCourse(id, "Hospitality Management")
];

class CoursePicker extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  state = {
    Course: ""
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
          value={this.state.Course}
          onChange={this.handleChange("Course")}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>Course:</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {courseData.map(option => (
            <MenuItem key={option.id} value={option.course}>
              {option.course}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(CoursePicker);
