import React from "react";
import {
} from "@material-ui/core";
import { connect } from 'react-redux'
import { toggleDialog } from '../../redux/ActionCreator/userBehavior'
import failedImg from './Failed.png'
import successImg from './Done.png'
import DefaultAlert from './DefaultDialog'

const AttendanceSheetDialog = ({createAttendanceRequested, dispatch}) =>{
  let img = ''
  let title = ''
  let detail = ''
  let error = ''
  if (createAttendanceRequested !==  false){
    if (createAttendanceRequested.result === 'ok') {
      title = 'Success'
      detail = 'Data has been saved to Databse'
      img = successImg
    }else {
      title = 'Failed'
      detail = `${createAttendanceRequested.error.message}`
      img = failedImg
      error = createAttendanceRequested.error.data.arguments[0]
    }
  }
  return <DefaultAlert
          img={img} 
          onClick={() => dispatch(toggleDialog(!createAttendanceRequested))} 
          title = {title}
          open={createAttendanceRequested ? true :false}
          detail={detail}
          error={error}/> 
}
export default connect(state => ({
  createAttendanceRequested : state.changePicker.createAttendanceRequested})) (AttendanceSheetDialog)
