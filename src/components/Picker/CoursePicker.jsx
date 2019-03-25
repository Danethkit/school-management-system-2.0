import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Select } from "@material-ui/core/";

export default class CoursePicker extends Component {
  state = {
    course: "1",
    open: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Grid container>
        <Grid item >
          Course :
        </Grid>
        <Grid item sm={9}>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.course}
                onChange={this.handleChange}
                inputProps={{
                  name: "course",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={1}>Software Engineering</MenuItem>
                <MenuItem value={2}>Hospitality Management</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    );
  }
}
