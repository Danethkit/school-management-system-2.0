import React, {useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestGroup } from '../../redux/ActionCreator/apiRequest'
import { onGroupChange } from '../../redux/ActionCreator/userBehavior'
import { setSubjects } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'




const GroupPicker = ({dispatch, group, batch, course, subjectInfo, semester}) => {
  let actions = bindActionCreators({requestGroup, onGroupChange}, dispatch)
  useEffect(()=> {
    let subjects =[]
    try{
        subjects = subjectInfo[course.value][batch.value][semester.value][group.value]
    }catch(err){ subjects = []}
    dispatch(setSubjects(subjects))

  })
  let groups = []
  try{
    groups = Object.keys(subjectInfo[course.value][batch.value][semester.value])
  }catch(err){
    groups = []
  }

  return <AutoComplete
          value ={group}
          onChange ={actions.onGroupChange}
          label = "Group"
          suggestions = {groups}
        />
}
export default connect(state => ({
  group:state.changePicker.group,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  semester : state.changePicker.semester,
  subjectInfo : state.initData.subjectInfo,
  sessionData:state.initData.sessionData,
}))(GroupPicker)