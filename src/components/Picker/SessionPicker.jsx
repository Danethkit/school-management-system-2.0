import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Select } from "@material-ui/core/";

export default class SessionPicker extends Component {
  state = {
    session: "1",
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
        Session :
        </Grid>
        <Grid item sm={9}>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.session}
                onChange={this.handleChange}
                inputProps={{
                  name: "session",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={1}>08:00am-08:50am</MenuItem>
                <MenuItem value={2}>08:50am-09:00am</MenuItem>
                <MenuItem value={3}>09:40am-10:30am</MenuItem>
                <MenuItem value={4}>10:45am-11:35am</MenuItem>
                <MenuItem value={5}>11:35am-12:25pm</MenuItem>
                <MenuItem value={6}>01:25pm-02:15pm</MenuItem>
                <MenuItem value={7}>02:15pm-03:20pm</MenuItem>
                <MenuItem value={8}>03:20pm-04:10pm</MenuItem>
                <MenuItem value={9}>04:10pm-05:00pm</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    );
  }
}
