import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onCourseChange, onBatchChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const CoursePicker = ({course, subjectInfo, userIden, dispatch}) => {
  const uid = localStorage.getItem('uid')
  let data = {}
  if(uid == 1){
    data = subjectInfo
  }else {
    data = userIden
  }
  let actions = bindActionCreators({onCourseChange}, dispatch)
  useEffect(()=> {
    if(!(course)){
      dispatch(onBatchChange(null))
    }
  })
  return <AutoComplete
          width={280}
          defaultSelectedItem={{ name: "dara" }}
          value={course}
          onChange={actions.onCourseChange}
          label = "Course"
          suggestions={data ? Object.keys(data): []} />
}
export default connect(state => ({
  course : state.changePicker.course,
  subjectInfo: state.initData.subjectInfo
}))(CoursePicker)
