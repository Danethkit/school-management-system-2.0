import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { InputAdornment } from "@material-ui/core";
import classNames from "classnames";
import { connect } from 'react-redux'
import { onDateChange } from '../../redux/ActionCreator/userBehavior'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textFile: {
    fontSize: 14
  }
});

const mapStateToProps = (state) => {
  return {
      date: state.changePicker.date
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeDate : (date) => dispatch(onDateChange(date))
  }
}

const datePicker = ({classes, date, onChangeDate}) => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoFocus
          fullWidth
          value={date}
          onChange={onChangeDate}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>Date:</b>
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }

datePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(datePicker))
