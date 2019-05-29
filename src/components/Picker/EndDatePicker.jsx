import "date-fns";
import React from "react";
import DefaultDatePicker from './DefaultDatePicker'
import { connect } from 'react-redux' 
import {changeReportEndDate} from '../../redux/ActionCreator/userBehavior'


const EndDatePicker = ({endDate, dispatch}) => {
 return <DefaultDatePicker value={endDate} label="End Date:" onChange={(date)=> dispatch(changeReportEndDate(date))}/>
}

export default connect(state=> ({endDate: state.changePicker.endDate}))(EndDatePicker)
