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
    margin: theme.spacing.unit,
    autofocus: true
  },
  textFile: {
    fontSize: 14
  }
});

let id = 0;

function inputWeek(id, week) {
  id += 1;
  return { id, week };
}
const weekData = [
  inputWeek(id, "Week1"),
  inputWeek(id, "Week2"),
  inputWeek(id, "Week3"),
  inputWeek(id, "Week4"),
  inputWeek(id, "Week5"),
  inputWeek(id, "Week6"),
  inputWeek(id, "Week7"),
  inputWeek(id, "Week8"),
  inputWeek(id, "Week9"),
  inputWeek(id, "Week10"),
  inputWeek(id, "Week11")
];

class WeekPicker extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  state = {
    Week: ""
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          select
          fullWidth
          autoFocus={true}
          className={classNames(classes.margin)}
          value={this.state.Week}
          onChange={this.handleChange("Week")}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="middle"

              >
                <b>{this.props.name}:</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {weekData.map(option => (
            <MenuItem key={option.id} value={option.week}>
              {option.week}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(WeekPicker);
