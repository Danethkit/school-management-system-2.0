import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onFacultyChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'


const FacultyPicker = ({dispatch, faculty, subjectInfo, course, batch, semester, group}) => {
  let actions = bindActionCreators({onFacultyChange}, dispatch)
  let faculties = []
  try{
    for (let e of subjectInfo[course][batch][semester][group]) {
      if (e.faculty) {
        faculties.push(e.faculty);
      }
    }
  }catch{}
  return <AutoComplete 
          value ={faculty}
          onChange ={actions.onFacultyChange}
          label = "Faculty"
          suggestions = {faculties}
        />
}
export default connect(state => ({
  faculty:state.changePicker.faculty,
  course:state.changePicker.course,
  batch:state.changePicker.batch,
  semester:state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
}))(FacultyPicker)