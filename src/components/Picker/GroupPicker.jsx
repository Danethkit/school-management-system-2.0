import React, {useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onGroupChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const GroupPicker = ({dispatch, group, batch, course, subjectInfo, userIden, semester}) => {
  let actions = bindActionCreators(onGroupChange, dispatch)
  let data = []
  const uid = localStorage.getItem('uid')
  try{
    if(uid != 1){
      data = Object.keys(userIden[course][batch][semester].filter(e=>e.includes('Group')))
    }else{
      data = Object.keys(subjectInfo[course][batch][semester]).filter(e=>e.includes('Group'))
    }
  }catch{}

  useEffect(()=>{
    if(!group) actions('Group 1')
  }, [semester])

  return <AutoComplete
          width={280}
          value ={group}
          onChange ={actions}
          label = "Group"
          suggestions = {data}
        />
}
export default connect(state => ({
  group:state.changePicker.group,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  semester : state.changePicker.semester,
  subjectInfo : state.initData.subjectInfo,
}))(GroupPicker)