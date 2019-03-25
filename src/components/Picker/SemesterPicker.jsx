import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Select } from "@material-ui/core/";

export default class SemesterPicker extends Component {
  state = {
    semester: "3",
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
        <Grid item sm>
        Semester :
        </Grid>
        <Grid item sm={9}>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.semester}
                onChange={this.handleChange}
                inputProps={{
                  name: "semester",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={1}>Semester 1</MenuItem>
                <MenuItem value={2}>Semester 2</MenuItem>
                <MenuItem value={3}>Semester 3</MenuItem>
                <MenuItem value={4}>Semester 4</MenuItem>
                <MenuItem value={5}>Semester 5</MenuItem>
                <MenuItem value={6}>Semester 6</MenuItem>
                <MenuItem value={7}>Semester 7</MenuItem>
                <MenuItem value={8}>Semester 8</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    );
  }
}
