import React, { Component } from "react"
import { connect } from 'react-redux'
import {onBatchChange} from '../../action'
import { MenuItem, FormControl, Select, Grid } from "@material-ui/core/"

class BatchPicker extends Component {
  state = {
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { dispatch, changeBatch } = this.props

    return (
      <>
        <Grid container>
          <Grid item sm>
            Batch :
          </Grid>
          <Grid item sm={9}>
            <form autoComplete="off">
              <FormControl>
                <Select
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={changeBatch.batch}
                  onChange={(event)=> {dispatch(onBatchChange(event.target.value))}}
                  inputProps={{
                    name: "batch",
                    id: "demo-controlled-open-select"
                  }}
                >
                  <MenuItem value={'Batch 1'}>Batch 1</MenuItem>
                  <MenuItem value={'Batch 2'}>Batch 2</MenuItem>
                  <MenuItem value={'Batch 3'}>Batch 3</MenuItem>
                  <MenuItem value={'Batch 4'}>Batch 4</MenuItem>
                  <MenuItem value={'Batch 5'}>Batch 5</MenuItem>
                  <MenuItem value={'Batch 6'}>Batch 6</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default connect(state => state)(BatchPicker)