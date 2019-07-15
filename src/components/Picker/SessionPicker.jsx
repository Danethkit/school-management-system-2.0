import React, {useEffect} from "react";
import { onSessionChange } from '../../redux/ActionCreator/userBehavior'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import AutoComplete from './AutoComplete'

export const sortSessionTime = (session) => {
    return session.sort((a, b) => {
      let timeA = [a.slice(0,5), ' ', a.slice(5,7)].join('')
      let timeB = [b.slice(0,5), ' ', b.slice(5,7)].join('')
      return new Date(`07/16/1999 ${timeA}`) - new Date(`07/16/1999 ${timeB}`)
    })
}
const SessionPicker = ({dispatch, session, subjectInfo, userIden, course, batch, semester,sessionNumber, group}) => {

    let suggestions = []
    let allSuggestions =  []
    try {
        allSuggestions = subjectInfo[course][batch][semester][group]['session']
        suggestions = Object.keys(userIden[course][batch][semester][group])
    } catch(err){}

    const action = bindActionCreators(onSessionChange, dispatch)

    useEffect(()=>{
        let index = suggestions.findIndex(e => e === allSuggestions[sessionNumber -1])
        action(suggestions[index])
    },[sessionNumber, subjectInfo, userIden])

    return <AutoComplete
            value ={session}
            onChange = {action}
            label = "Session"
            suggestions ={sortSessionTime(suggestions)} />
  }

export default connect(state => ({
    session: state.changePicker.session,
    course: state.changePicker.course,
    batch: state.changePicker.batch,
    semester: state.changePicker.semester,
    group: state.changePicker.group,
    subjectInfo: state.initData.subjectInfo}))(SessionPicker)
