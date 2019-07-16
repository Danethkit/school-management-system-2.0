import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onCourseChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const CoursePicker = ({course, subjectInfo, userIden, uid, dispatch}) => {
  let data = {}
  if(uid.uid === 'admin'){
    data = subjectInfo
  }else {
    data = userIden
  }
  let actions = bindActionCreators({onCourseChange}, dispatch)
  return <AutoComplete
          value={course}
          onChange={actions.onCourseChange}
          label = "Course"
          suggestions={data ? Object.keys(data): []} />
}
export default connect(state => ({
  course : state.changePicker.course,
  subjectInfo: state.initData.subjectInfo,
  uid: state.initData.uid
}))(CoursePicker)
