import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onFacultyChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'


const FacultyPicker = ({dispatch, faculty, subjectInfo, course, batch, semester, group, user}) => {
  const uid = localStorage.getItem('uid')
  let actions = bindActionCreators({onFacultyChange}, dispatch)
  let suggestions = []
  if(uid == 1){
    try{
      for (let e of subjectInfo[course][batch][semester][group]) {
        if (e.faculty && !(suggestions.includes(e.faculty))) {
          suggestions.push(e.faculty);
        }
      }
    }catch(e){}
  }else {
    suggestions.push(user)
    faculty = user
  }
  return <AutoComplete 
          value ={faculty}
          onChange ={actions.onFacultyChange}
          label = "Faculty"
          suggestions = {suggestions}
          disable = {uid == 1 ? false : true}
        />
}
export default connect(state => ({
  faculty:state.changePicker.faculty,
  course:state.changePicker.course,
  batch:state.changePicker.batch,
  group:state.changePicker.group,
  semester:state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
}))(FacultyPicker)