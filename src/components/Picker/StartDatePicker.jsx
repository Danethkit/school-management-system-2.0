import "date-fns";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DefaultDatePicker from './DefaultDatePicker'
import { connect } from 'react-redux' 
import {changeReportStartDate} from '../../redux/ActionCreator/userBehavior'

const styles = theme => ({
  margin: {
    margin: theme.spacing(3)
  },
  textFile: {
    fontSize: 14
  }
});

const StartDatePicker = ({startDate, dispatch}) => {
 return <DefaultDatePicker value={startDate} label="StartDate" onChange={(date) => dispatch(changeReportStartDate(date))}/>
}

export default connect(state=> ({startDate: state.changePicker.startDate}))(withStyles(styles)(StartDatePicker))
