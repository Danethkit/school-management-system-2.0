import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestSemester } from '../../redux/ActionCreator/apiRequest' 
import { onSemesterChange } from '../../redux/ActionCreator/userBehavior' 
import DefaultPicker from './DefaultPicker'

const SemesterPicker = ({dispatch, semester, semesterData, batch}) => {
  let actions = bindActionCreators({requestSemester, onSemesterChange}, dispatch) 
  useEffect(()=> { actions.requestSemester()}, [])
  let names = []
  if(semesterData[batch] !== undefined){
    semesterData[batch].map(e => names.push(e.name))
  }
  return <DefaultPicker 
          value ={semester}
          handleOnChange ={actions.onSemesterChange}
          label = "Semester"
          menuItem = {{...names}}
        />
}
export default connect(state => ({
  semester:state.changePicker.semester,
  semesterData: state.requestStudentData.semesterData,
  batch : state.changePicker.batch
}))(SemesterPicker)