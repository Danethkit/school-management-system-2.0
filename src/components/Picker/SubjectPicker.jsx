import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Select } from "@material-ui/core/";

export default class SubjectPicker extends Component {
  state = {
    subject: "4",
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
        Subject :
        </Grid>
        <Grid item sm={9}>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.subject}
                onChange={this.handleChange}
                inputProps={{
                  name: "subject",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={1}>Subject 1</MenuItem>
                <MenuItem value={2}>Subject 2</MenuItem>
                <MenuItem value={3}>Subject 3</MenuItem>
                <MenuItem value={4}>Subject 4</MenuItem>
                <MenuItem value={5}>Subject 5</MenuItem>
                <MenuItem value={6}>Subject 6</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    );
  }
}
