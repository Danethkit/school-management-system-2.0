import React, {useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onBatchChange, onSemesterChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const BatchPicker = ({dispatch, batch, subjectInfo, userIden, course}) => {
  const uid = localStorage.getItem('uid')
  let data = {}
  if(uid == 1){
    data = subjectInfo
  }else {
    data = userIden
  }
  useEffect(()=>{
    if(!batch){
      dispatch(onSemesterChange(null))
    }
  })
  let allBatch = []
  try{
    let batches = data[course]
    allBatch = Object.keys(batches).sort((a, b)=> a.split(" ")[1] - b.split(" ")[1])
  }catch(err){}
  let action = bindActionCreators(onBatchChange, dispatch)

  return <AutoComplete
          width={280}
          value={batch}
          onChange={action}
          label = "Batch"
          suggestions={allBatch} />
}

export default connect(state => ({
  batch:state.changePicker.batch,
  course: state.changePicker.course,
  subjectInfo: state.initData.subjectInfo
}))(BatchPicker)