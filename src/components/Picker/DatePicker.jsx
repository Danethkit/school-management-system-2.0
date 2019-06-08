import "date-fns";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { onDateChange } from '../../redux/ActionCreator/userBehavior'
import DefaultDatePicker from './DefaultDatePicker'

const styles = theme => ({
  margin: {
    // margin: theme.spacing(3),

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

const AttendanceDate = ({date, onChangeDate}) => {
    return <DefaultDatePicker value={date} onChange={onChangeDate} label = "Date" />
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AttendanceDate))
