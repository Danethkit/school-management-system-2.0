import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Select } from "@material-ui/core/";

export default class GroupPicker extends Component {
  state = {
    group: "1",
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
        Group :
        </Grid>
        <Grid item sm={9}>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.group}
                onChange={this.handleChange}
                inputProps={{
                  name: "group",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={1}>Group 1</MenuItem>
                <MenuItem value={2}>Group 2</MenuItem>
                <MenuItem value={3}>Group 3</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    );
  }
}
