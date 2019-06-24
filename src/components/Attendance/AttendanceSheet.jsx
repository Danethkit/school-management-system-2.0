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

const mapStateToProps = (state) => {
  return {
      studentData: state.studentData,
      isPending: state.isPending,
      error: state.error,
      session: state.changePicker.session,
      course: state.changePicker.course,
      batch: state.changePicker.batch,
      semester: state.changePicker.semester,
      subjectInfo: state.initData.subjectInfo
  }
}

const AttendancesSheet = ({classes, dispatch, date, course, batch, semester, session, subjectInfo}) => {
  const uid = localStorage.getItem('uid')
  const yyyy = date.getFullYear()
  const mm = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +1
  const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  useEffect(()=>{
    dispatch(requestUserIdentity({date:`${yyyy}-${mm}-${dd}`, uid}))
  }, [])

  const [sessionNumber, setSessionNumber] = useState(1)

  useEffect(()=>{
    if(Object.keys(subjectInfo).length !== 0){
      if(!session) return
      setSessionNumber(subjectInfo[course][batch][semester]['session'].findIndex(e=> e === session)+1)
    }
  }, [session])

  const handleChangeSessionNumber = (event, sessionNumber) => {
    setSessionNumber(sessionNumber);
  };

  const createSessionTab = (classTab) => {
    let tabs = [];
    for (let i = 1; i < 10; i++) {
      tabs.push(
        <Tab label={"session " + i} className={classTab} key={i} value={i} />
      );
    }
    return tabs;
  }

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
              {createSessionTab(classes.tab)}
            </Tabs>
          </AppBar>
          <HeadPicker sessionNumber={sessionNumber} />
          <SessionTable />
        </div>
}

export default connect(state => ({
  studentData: state.studentData,
  date: state.changePicker.date,
  session: state.changePicker.session,
  course: state.changePicker.course,
  batch: state.changePicker.batch,
  semester: state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo
}))(withStyles(styles)(AttendancesSheet))
