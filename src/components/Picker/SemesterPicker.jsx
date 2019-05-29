import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestSemester } from '../../redux/ActionCreator/apiRequest' 
import { onSemesterChange } from '../../redux/ActionCreator/userBehavior' 
import DefaultPicker from './DefaultPicker'

const SemesterPicker = ({dispatch, semester, subjectInfo, batch, course}) => {
  let actions = bindActionCreators({requestSemester, onSemesterChange}, dispatch) 
  let semesters = []
  if(Object.keys(subjectInfo).length !== 0){
    semesters = Object.keys(subjectInfo[course][batch])
    if(!(semesters.includes(semester))){
      semester = semesters[0]
    }
  }
  
  useEffect(()=> { actions.requestSemester()}, [])
  return <DefaultPicker 
          value ={semester}
          handleOnChange ={actions.onSemesterChange}
          label = "Semester"
          menuItem = {{...semesters}}
        />
}
export default connect(state => ({
  semester:state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
  batch : state.changePicker.batch,
  course : state.changePicker.course

}))(SemesterPicker)