import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

export default connect(state=> ({uid:state.initData.uid}))(({ component: Component, uid, route, ...rest }) => {
    return <>
    {
        uid.uid === undefined ? null :
        <Route {...rest} render={(props) => (
            uid.uid === 'admin' || uid.uid === 'faculty' ?
               <Component {...props} /> :
               <Redirect to={{ pathname: '/sms/timetable/student', state: { from: props.location }}} />
        )} />
    }
    </>

})