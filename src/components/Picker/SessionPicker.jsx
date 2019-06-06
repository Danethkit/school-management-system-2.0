import React, { useEffect } from "react";
import { bindActionCreators } from 'redux'
import { requestSession} from '../../redux/ActionCreator/apiRequest' 
import { onSessionChange } from '../../redux/ActionCreator/userBehavior' 
import { connect } from 'react-redux'
import DefaultPicker from './DefaultPicker'

const sortSessionTime = (session) => {
    return session.sort((a, b) => {
      let tempA = a.name.split('-')[0]
      let tempB = b.name.split('-')[0]
      let timeA = [tempA.slice(0,5), ' ', tempA.slice(5,7)].join('')
      let timeB = [tempB.slice(0,5), ' ', tempB.slice(5,7)].join('')
      return new Date(`07/16/1999 ${timeA}`) - new Date(`07/16/1999 ${timeB}`)
    })
  }
  const SessionPicker = ({dispatch, session, sessionData}) => {
    let actions = bindActionCreators({requestSession, onSessionChange}, dispatch)
    useEffect(()=> { actions.requestSession()}, [])
    let names = []
    sortSessionTime(sessionData).map(e => names.push(e.name))
    return <DefaultPicker 
              value ={session}
              handleOnChange = {actions.onSessionChange}
              label = "Session"
              menuItem ={{...names}}
            />
  }

export default connect(state => ({
    session: state.changePicker.session,
    sessionData: state.initData.sessionData}))(SessionPicker)
