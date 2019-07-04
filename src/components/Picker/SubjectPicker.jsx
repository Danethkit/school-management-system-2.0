import React, {useEffect} from "react"
import { connect } from 'react-redux'
import { onSubjectChange } from '../../redux/ActionCreator/userBehavior'
import { bindActionCreators } from "redux";
import AutoComplete from './AutoComplete'

const SubjectPicker = ({dispatch, subject, userIden, course, batch, semester, group, session}) => {
  let actions = bindActionCreators(onSubjectChange,dispatch)
  let sub = ''
  try{
    sub = userIden[course][batch][semester][group][session]['subject']
  }catch{}

  useEffect(()=>{
    actions(sub)
  },[session])

  return <AutoComplete
          width={280}
          value ={subject}
          onChange={actions}
          label="Subject"
          suggestions={[]}
          disable={true}/>
}
export default connect(state => ({
  batch: state.changePicker.batch,
  session: state.changePicker.session,
  subject: state.changePicker.subject,
  course: state.changePicker.course,
  semester: state.changePicker.semester,
  group: state.changePicker.group,
}))(SubjectPicker)
