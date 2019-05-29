import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onBatchChange } from '../../redux/ActionCreator/userBehavior'
import DefaultPicker from './DefaultPicker'

const BatchPicker = ({dispatch, batch, subjectInfo, course}) => {
  let allBatch = []
  if(Object.keys(subjectInfo).length !== 0){
    let batches = subjectInfo[course]
    allBatch = Object.keys(batches).sort((a, b)=> a.split(" ")[1] - b.split(" ")[1])
  }
  let action = bindActionCreators(onBatchChange, dispatch)
  
  return <DefaultPicker 
          value ={batch}
          handleOnChange ={action}
          label = "Batch"
          menuItem = {{...allBatch}}
        />
}

export default connect(state => ({
  batch:state.changePicker.batch,
  course: state.changePicker.course,
  subjectInfo: state.initData.subjectInfo
}))(BatchPicker)