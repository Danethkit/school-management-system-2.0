import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestCourse } from '../../redux/ActionCreator/apiRequest'
import { onCourseChange, onBatchChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const CoursePicker = ({course, courseData, dispatch}) => {
  let actions = bindActionCreators({requestCourse, onCourseChange}, dispatch)
  useEffect(() => {
    actions.requestCourse()
  }, [])
  useEffect(()=> {
    if(!(course)){
      dispatch(onBatchChange(null))
    }
  })
  let label = []
  courseData.map(e=> label.push(e.name))

  return <AutoComplete
          width={298.81}
          defaultSelectedItem={{ name: "dara" }}
          value={course}
          onChange={actions.onCourseChange}
          label = "Course"
          suggestions={label} />
}
export default connect(state => ({
  course : state.changePicker.course,
  courseData:state.initData.courseData
}))(CoursePicker)
