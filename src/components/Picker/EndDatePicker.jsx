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

class EndDatePicker extends React.Component {
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
                <DatePicker
                    autoFocus
                    fullWidth
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                disableTypography={true}
                                className={classes.textFile}
                                position="start"
                            >
                                <b>EndDate:</b>
                            </InputAdornment>
                        )
                    }}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

EndDatePicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EndDatePicker);