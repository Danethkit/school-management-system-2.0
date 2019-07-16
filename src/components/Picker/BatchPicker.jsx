import React, {useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onBatchChange, onSemesterChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const BatchPicker = ({dispatch, uid, batch, subjectInfo, userIden, course}) => {
  let data = {}
  if(uid.uid === 'admin'){
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
          value={batch}
          onChange={action}
          label = "Batch"
          suggestions={allBatch} />
}

export default connect(state => ({
  batch:state.changePicker.batch,
  course: state.changePicker.course,
  subjectInfo: state.initData.subjectInfo,
  uid: state.initData.uid,
}))(BatchPicker)