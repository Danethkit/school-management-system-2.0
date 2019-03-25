import React, { Component } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Grid
} from "@material-ui/core/";

export default class BatchPicker extends Component {
  state = {
    batch: "4",
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
      <div>
        <Grid container>
          <Grid item >
            Batch :
          </Grid>
          <Grid item sm={9}>
            <form autoComplete="off">
              <FormControl>
                <Select
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={this.state.batch}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "batch",
                    id: "demo-controlled-open-select"
                  }}
                >
                  <MenuItem value={1}>Batch 1</MenuItem>
                  <MenuItem value={2}>Batch 2</MenuItem>
                  <MenuItem value={3}>Batch 3</MenuItem>
                  <MenuItem value={4}>Batch 4</MenuItem>
                  <MenuItem value={5}>Batch 5</MenuItem>
                  <MenuItem value={6}>Batch 6</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
