import React from "react";
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
const SessionPicker = ({dispatch, session, subjectInfo, course, batch, semester,sessionNumber, group}) => {
    const action = bindActionCreators(onSessionChange, dispatch)
    let suggestions = []
    let sessionSuggestion = []
    try {
        suggestions = subjectInfo[course][batch][semester]['session']
        for(let i=1;i<10;i++)
        {
            sessionSuggestion=suggestions.map((element,index)=>{
                return {key:index+1, value:element}
            })

        }


    } catch(err){}

        return(
    <>
        {sessionSuggestion.map((element) =>{
            switch (sessionNumber) {
                case element.key :return <AutoComplete
                                            width={280}
                                            key ={element.key}
                                            value ={element.value}
                                            onChange = {action}
                                            label = "Session"
                                            suggestions ={suggestions}
                                        />
                default: return null
            }
        })}




    </>)
  }

export default connect(state => ({
    session: state.changePicker.session,
    course: state.changePicker.course,
    batch: state.changePicker.batch,
    semester: state.changePicker.semester,
    group: state.changePicker.group,
    subjectInfo: state.initData.subjectInfo}))(SessionPicker)
