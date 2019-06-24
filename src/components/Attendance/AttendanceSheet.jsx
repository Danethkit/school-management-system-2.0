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


const AttendancesSheet = ({classes, dispatch, date}) => {
  console.log('date',date.getDate());
  console.log('get month', date.getMonth());
  console.log('get year', date.getFullYear());
  const uid = localStorage.getItem('uid')
  const yyyy = date.getFullYear()
  const mm = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth()
  const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  useEffect(()=>{
    dispatch(requestUserIdentity({date:`${date.getFullYear()}-${date.getMonth()}-${date.getFullYear()}`, uid}))
  }, [])


  const [sessionNumber, setSessionNumber] = useState(1)

  const handleChangeSessionNumber = (event, sessionNumber) => {
    setSessionNumber({ sessionNumber });
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
          <HeadPicker />
          <SessionTable />
        </div>
}

export default connect(state => ({
  studentData: state.studentData,
  date: state.changePicker.date
}))(withStyles(styles)(AttendancesSheet))
