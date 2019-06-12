import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestSemester } from '../../redux/ActionCreator/apiRequest'
import { onSemesterChange, onGroupChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'


const SemesterPicker = ({dispatch, semester, subjectInfo, batch, course}) => {
  let actions = bindActionCreators({requestSemester, onSemesterChange}, dispatch)
  let semesters = []
  try{
    semesters = Object.keys(subjectInfo[course][batch])
  }catch(err){}

  useEffect(()=> {
    if(!semester) {
      dispatch(onGroupChange(null))
    }
  })

  useEffect(()=> { actions.requestSemester()}, [])
  return <AutoComplete
          value ={semester}
          onChange ={actions.onSemesterChange}
          label = "Semester"
          suggestions = {semesters}
        />
}
export default connect(state => ({
  semester:state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
  batch : state.changePicker.batch,
  course : state.changePicker.course

}))(SemesterPicker)