import React, { useEffect } from "react";
import { bindActionCreators } from 'redux'
import { getSessionData} from '../../redux/ActionCreator/apiRequest' 
import { onSessionChange } from '../../redux/ActionCreator/userBehavior' 
import { connect } from 'react-redux'
import AutoComplete from './AutoComplete'

export const sortSessionTime = (session) => {
    return session.sort((a, b) => {
      let timeA = [a.slice(0,5), ' ', a.slice(5,7)].join('')
      let timeB = [b.slice(0,5), ' ', b.slice(5,7)].join('')
      return new Date(`07/16/1999 ${timeA}`) - new Date(`07/16/1999 ${timeB}`)
    })
}
  
const SessionPicker = ({dispatch, session, sessionData, course, batch, semester, group}) => {
    let actions = bindActionCreators({getSessionData, onSessionChange}, dispatch)
    useEffect(()=> { actions.getSessionData()}, [])
    let names = []
    try{
        names = sortSessionTime(sessionData[course][batch][semester][group])
    }catch(err){
      names = []
    }
    return <AutoComplete 
              value ={session}
              onChange = {actions.onSessionChange}
              label = "Session"
              suggestions ={names}
            />
  }

export default connect(state => ({
    session: state.changePicker.session,
    course: state.changePicker.course,
    batch: state.changePicker.batch,
    semester: state.changePicker.semester,
    group: state.changePicker.group,
    sessionData: state.initData.sessionData}))(SessionPicker)
