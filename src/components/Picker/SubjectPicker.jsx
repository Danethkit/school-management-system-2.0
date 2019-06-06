import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { requestSubject } from '../../redux/ActionCreator/apiRequest' 
import { onSubjectChange } from '../../redux/ActionCreator/userBehavior' 
import { bindActionCreators } from "redux";
import AutoComplete from './AutoComplete'

const SubjectPicker = ({dispatch, subject, subjects}) => {
  let actions = bindActionCreators({requestSubject, onSubjectChange},dispatch)
  useEffect(()=>{ actions.requestSubject()}, [])

  return <AutoComplete
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
