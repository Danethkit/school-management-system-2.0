import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestGroup } from '../../redux/ActionCreator/apiRequest' 
import { onGroupChange } from '../../redux/ActionCreator/userBehavior' 
import DefaultPicker from './DefaultPicker'
import { setSubjects } from '../../redux/ActionCreator/userBehavior'


const GroupPicker = ({dispatch, group, batch, course, subjectInfo, semester}) => {
  let actions = bindActionCreators({requestGroup, onGroupChange}, dispatch) 
  useEffect(()=> { 
    let subjects =[]
    if(course && batch && semester && group && Object.keys(subjectInfo).length !== 0){
        subjects = subjectInfo[course][batch][semester][group]
    }
    dispatch(setSubjects(subjects))  
  })
  let groups = []
  if (Object.keys(subjectInfo).length !== 0 && semester !== ''){
    groups = Object.keys(subjectInfo[course][batch][semester])
  }
  
  return <DefaultPicker 
          value ={group}
          handleOnChange ={actions.onGroupChange}
          label = "Group"
          menuItem = {{...groups}}
        />
}
export default connect(state => ({
  group:state.changePicker.group,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  semester : state.changePicker.semester,
  subjectInfo : state.initData.subjectInfo
}))(GroupPicker)