import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onSemesterChange, onGroupChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'


const SemesterPicker = ({dispatch, semester, subjectInfo, batch, userIden, course, disable=false}) => {

  let actions = bindActionCreators(onSemesterChange, dispatch)

  let semesters = []
  try{
    semesters = Object.keys(subjectInfo[course][batch])
  }catch(err){}

  useEffect(()=> {
    if(!semester) {
      dispatch(onGroupChange(null))
    }
    if(Object.keys(userIden).length) dispatch(actions(userIden['semester']))
  },[userIden])

  return <AutoComplete
          value ={semester}
          onChange ={actions}
          label = "Semester"
          suggestions = {semesters}
          disable = {disable}
        />
}
export default connect(state => ({
  semester:state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  userIden: state.initData.userIden
}))(SemesterPicker)