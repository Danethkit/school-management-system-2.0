import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { requestSubject } from '../../redux/ActionCreator/apiRequest' 
import { onSubjectChange } from '../../redux/ActionCreator/userBehavior' 
import { bindActionCreators } from "redux";
import DefaultPicker from './DefaultPicker'

const SubjectPicker = ({dispatch, batch, subject, subjectData}) => {
  let actions = bindActionCreators({requestSubject, onSubjectChange},dispatch)
  useEffect(()=>{ actions.requestSubject()}, [])
  let filteredData = batch in subjectData ? subjectData[batch] : []
  let res = []
  filteredData.map(e => res.push(`${e.name} [${e.code}]`))

  return <DefaultPicker 
          value ={subject}
          handleOnChange={actions.onSubjectChange}
          label="Subject"
          menuItem={{...res}}/>
}
export default connect(state => ({
  subjectData: state.requestStudentData.subjectData,
  error: state.error,
  batch: state.changePicker.batch,
  subject: state.changePicker.subject
}))(SubjectPicker)
