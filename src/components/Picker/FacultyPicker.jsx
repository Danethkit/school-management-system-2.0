import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Select } from "@material-ui/core/";

export default class FacultyPicker extends Component {
  state = {
    faculty: "4",
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
        Faculty :
        </Grid>
        <Grid item sm={9}>
          <form autoComplete="on">
            <FormControl>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.faculty}
                onChange={this.handleChange}
                inputProps={{
                  name: "faculty",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={1}>Leo</MenuItem>
                <MenuItem value={2}>Dinesh</MenuItem>
                <MenuItem value={3}>Vignesh</MenuItem>
                <MenuItem value={4}>Shiraz</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    );
  }
}
