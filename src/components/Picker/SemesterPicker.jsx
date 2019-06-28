import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onSemesterChange, onGroupChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'


const SemesterPicker = ({dispatch, semester, subjectInfo, batch, userIden, course}) => {

  let actions = bindActionCreators(onSemesterChange, dispatch)
  const uid = localStorage.getItem('uid')
  // let lastSemIndex = ''
  // if(course && batch && semester && Object.keys(subjectInfo).length !== 0){
  //   lastSemIndex = Object.keys(subjectInfo[course][batch])[Object.keys(subjectInfo[course][batch]).length -1]
  // }

  let semesters = []
  try{
    semesters = Object.keys(subjectInfo[course][batch])
  }catch(err){}

  useEffect(()=> {
    if(!semester) {
      dispatch(onGroupChange(null))
    }
    // if(lastSemIndex) dispatch(actions(lastSemIndex))
  },[batch, semester])

  return <AutoComplete
          width={280}
          value ={semester}
          onChange ={actions}
          label = "Semester"
          suggestions = {semesters}
          disable={uid == 1? false : true}
        />
}
export default connect(state => ({
  semester:state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
  batch : state.changePicker.batch,
  course : state.changePicker.course

}))(SemesterPicker)