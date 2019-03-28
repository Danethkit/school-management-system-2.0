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

function inputSubject(id, subject) {
  id += 1;
  return { id, subject };
}
const subjectData = [
  inputSubject(id, "Advanced Java"),
  inputSubject(id, "Software Engineering"),
  inputSubject(id, "Leadership & Communication"),
  inputSubject(id, "Data Structure")
];

class SubjectPicker extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  state = {
    Subject: ""
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
          value={this.state.Subject}
          onChange={this.handleChange("Subject")}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>Subject:</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {subjectData.map(option => (
            <MenuItem key={option.id} value={option.subject}>
              {option.subject}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles)(SubjectPicker);
