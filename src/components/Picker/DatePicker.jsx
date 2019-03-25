import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

const styles = {
  grid: {
    width: "20%",
    paddingTop: 10
  }
};

class datePicker extends React.Component {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <Grid item sm>
            Date :
          </Grid>
          <Grid item sm={9}>
            
              <DatePicker
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                className={classes.filledInput}
              />
            
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

datePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(datePicker);
