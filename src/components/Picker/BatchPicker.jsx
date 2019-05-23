import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onBatchChange } from '../../redux/ActionCreator/userBehavior'
import DefaultPicker from './DefaultPicker'

const BatchPicker = ({dispatch, changePicker, requestStudentData}) => {
  const allBatch = Object.keys(requestStudentData.studentData).sort((a, b)=> a.split(" ")[1] - b.split(" ")[1])
  let action = bindActionCreators(onBatchChange, dispatch)
  return <DefaultPicker 
          value ={changePicker.batch}
          dispatch ={ dispatch }
          handleOnChange ={action}
          label = "Batch"
          menuItem = {{...allBatch}}
        />
}

export default connect(state => ({
  changePicker:state.changePicker,
  requestStudentData: state.requestStudentData
}))(BatchPicker)