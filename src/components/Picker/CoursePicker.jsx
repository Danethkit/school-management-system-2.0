import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestCourse } from '../../redux/ActionCreator/apiRequest' 
import { onCourseChange } from '../../redux/ActionCreator/userBehavior' 
import  DefaultPicker  from './DefaultPicker'

const CoursePicker = ({ course, courseData, dispatch}) => {
  let actions = bindActionCreators({requestCourse, onCourseChange}, dispatch)
  useEffect(() => {
    actions.requestCourse()
  }, [])
  let label = []
  courseData.map(e=> label.push(e.name))
  return <DefaultPicker 
            value ={course}
            handleOnChange ={actions.onCourseChange}
            label = "Course"
            menuItem = {{...label}}
          />
}
export default connect(state => ({
  course : state.changePicker.course, 
  courseData:state.requestStudentData.courseData
}))(CoursePicker)
