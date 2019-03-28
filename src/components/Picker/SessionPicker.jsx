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

function inputSession(id, session) {
  id += 1;
  return { id, session };
}
const sessionData = [
  inputSession(id, "08:00am-08:50am"),
  inputSession(id, "08:50am-09:40am"),
  inputSession(id, "09:40am-10:30am"),
  inputSession(id, "10:45am-11:35am"),
  inputSession(id, "11:35am-12:25am"),
  inputSession(id, "01:25pm-02:15pm"),
  inputSession(id, "02:15pm-03:05pm"),
  inputSession(id, "03:20pm-04:10pm"),
  inputSession(id, "04:10pm-05:00pm")
];

class SessionPicker extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  state = {
    Session: ""
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          fullWidth
          select
          autoFocus
          className={classNames(classes.margin)}
          value={this.state.Session}
          onChange={this.handleChange("Session")}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>Session:</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {sessionData.map(option => (
            <MenuItem key={option.id} value={option.session}>
              {option.session}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(SessionPicker);
