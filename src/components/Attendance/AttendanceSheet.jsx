import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, withStyles } from "@material-ui/core";
import HeadPicker from "../../components/Picker/HeadPicker";
import SessionTable from "../../components/Table/SessionTable";
import { connect } from 'react-redux'
import {requestUserIdentity} from '../../redux/ActionCreator/apiRequest'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  }
});

const AttendancesSheet = ({classes, dispatch, date, course, batch, group, faculty, semester, session, subjectInfo, userIden}) => {

  const uid = localStorage.getItem('uid')
  const yyyy = date.getFullYear()
  const mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +1
  const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  useEffect(()=>{
    if(date == 'Invalid Date') return
    if(date > new Date()) return
    dispatch(requestUserIdentity({date:`${yyyy}-${mm}-${dd}`, uid, course, batch, group, faculty, semester}))
  }, [date, faculty, course, batch, group, semester])

  const [sessionNumber, setSessionNumber] = useState(1)

  useEffect(()=>{
    if(Object.keys(subjectInfo).length !== 0){
      if(!session) return
      setSessionNumber(subjectInfo[course][batch][semester][group]['session'].findIndex(e=> e === session)+1)
    }
  }, [session])

  const handleChangeSessionNumber = (event, sessionNumber) => {
    setSessionNumber(sessionNumber);
  };

  let availableTab = []
  let allSessions = []
  try{
    if(Object.keys(subjectInfo).length !== 0) {
      allSessions = subjectInfo[course][batch][semester][group]['session']
      let availableSession = Object.keys(userIden[course][batch][semester][group])
      allSessions.forEach((e,i) => {
        if(availableSession.includes(e)){
          availableTab.push(i+1)
        }
      })
    }
  }catch{}

  return <div style={{flexGrow: 1, width: "100%"}}>
          <h1>Attendance Sheet</h1>
          <AppBar position="static" color="default">
            <Tabs
              value={sessionNumber}
              onChange={handleChangeSessionNumber}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              classes={{ root: classes.tabRoot }}
              scrollButtons="on"
            >
              {
                (uid == 1 ?  allSessions.map((e,i)=> i+1) : availableTab).map(i=>  <Tab label={"session " + i} className={classes.Tab} key={i} value={i} />)
              }
            </Tabs>
          </AppBar>
          <HeadPicker sessionNumber={sessionNumber} userIden={userIden} />
          <SessionTable sessions = {uid == 1 ? allSessions.map((e,i)=> i+1):availableTab} sessionNumber={sessionNumber}/>
        </div>
}

export default connect(state => ({
  studentData: state.studentData,
  date: state.changePicker.date,
  session: state.changePicker.session,
  course: state.changePicker.course,
  batch: state.changePicker.batch,
  group: state.changePicker.group,
  faculty: state.changePicker.faculty,
  semester: state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
  userIden: state.initData.userIden
}))(withStyles(styles)(AttendancesSheet))
