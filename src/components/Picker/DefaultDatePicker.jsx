import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { InputAdornment } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textFile: {
    fontSize: 14
  }
});

const DefaultDatePicker = ({classes, value, onChange , label}) =>{

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoFocus
          disableFuture
          fullWidth
          value={value}
          onChange={date => onChange(date)}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start"
              >
                <b>{label}:</b>
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>
    );
}


DefaultDatePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DefaultDatePicker)
