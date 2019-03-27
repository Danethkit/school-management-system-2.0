import React, { Component } from "react";
import {
  MenuItem,
  TextField,
  InputAdornment,
  withStyles
} from "@material-ui/core/";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textFile: {
    fontSize: 14
  }
});

let id = 0;

function inputFaculty(id, faculty) {
  id += 1;
  return { id, faculty };
}
const facultyData = [
  inputFaculty(id, "Shiraz"),
  inputFaculty(id, "Dinesh"),
  inputFaculty(id, "Vignesh")
];

class FacultyPicker extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  state = {
    Faculty: ""
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          fullWidth
          select
          autoFocus
          className={classes.margin}
          value={this.state.Faculty}
          onChange={this.handleChange("Faculty")}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>Faculty:</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {facultyData.map(option => (
            <MenuItem key={option.id} value={option.faculty}>
              {option.faculty}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(FacultyPicker);
