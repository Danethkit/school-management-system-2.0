import React from "react"
import { connect } from 'react-redux'
import { onSubjectChange } from '../../redux/ActionCreator/userBehavior' 
import { bindActionCreators } from "redux";
import AutoComplete from './AutoComplete'

const SubjectPicker = ({dispatch, subject, subjects}) => {
  let actions = bindActionCreators({onSubjectChange},dispatch)

  return <AutoComplete
          width={280}
          value ={subject}
          onChange={actions.onSubjectChange}
          label="Subject"
          suggestions={subjects}/>
}
export default connect(state => ({
  subjects: state.changePicker.subjects,
  error: state.error,
  batch: state.changePicker.batch,
  subject: state.changePicker.subject
}))(SubjectPicker)
