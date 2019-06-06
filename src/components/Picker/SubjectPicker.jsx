import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { requestSubject } from '../../redux/ActionCreator/apiRequest' 
import { onSubjectChange } from '../../redux/ActionCreator/userBehavior' 
import { bindActionCreators } from "redux";
import DefaultPicker from './DefaultPicker'

const SubjectPicker = ({dispatch, batch, subject, subjects}) => {
  let actions = bindActionCreators({requestSubject, onSubjectChange},dispatch)
  useEffect(()=>{ actions.requestSubject()}, [])
  // let filteredData = batch in subjects ? subjects[batch] : []
  // let res = []
  // filteredData.map(e => res.push(`${e.name} [${e.code}]`))

  return <DefaultPicker 
          value ={subject}
          handleOnChange={actions.onSubjectChange}
          label="Subject"
          menuItem={{...subjects}}/>
}
export default connect(state => ({
  subjects: state.changePicker.subjects,
  error: state.error,
  batch: state.changePicker.batch,
  subject: state.changePicker.subject
}))(SubjectPicker)
