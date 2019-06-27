import React, {useEffect} from "react"
import { connect } from 'react-redux'
import { onSubjectChange } from '../../redux/ActionCreator/userBehavior' 
import { bindActionCreators } from "redux";
import AutoComplete from './AutoComplete'

const SubjectPicker = ({dispatch, subject, subjects, userIden,course, batch, semester, group, session}) => {
  let actions = bindActionCreators(onSubjectChange,dispatch)
  let suggestions = []
  let sub = ''
  try{
    sub = userIden[course][batch][semester][group][session]
  }catch{}

  useEffect(()=>{
    actions(sub)
  },[session])
  const uid = localStorage.getItem('uid')
  if(uid == 1){
    suggestions = subjects
  }else {
    suggestions = []
  }

  return <AutoComplete
          width={280}
          value ={subject}
          onChange={actions}
          label="Subject"
          suggestions={suggestions}
          disable={uid == 1? false: true}/>
}
export default connect(state => ({
  subjects: state.changePicker.subjects,
  batch: state.changePicker.batch,
  session: state.changePicker.session,
  subject: state.changePicker.subject,
  course: state.changePicker.course,
  semester: state.changePicker.semester,
  group: state.changePicker.group,
}))(SubjectPicker)
