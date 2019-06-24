import React, { useState } from "react";
import { AppBar, Tabs, Tab, withStyles } from "@material-ui/core";
import HeadPicker from "../../components/Picker/HeadPicker";
import SessionTable from "../../components/Table/SessionTable";
import { connect } from 'react-redux'

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

const AttendancesSheet = ({classes}) => {

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
  componentWillReceiveProps(nextProps, nextContext) {
      let {course, batch, semester, session} = nextProps
      let sessionSuggestion=[]
      try{
          let suggestions = nextProps.subjectInfo[course][batch][semester]['session']
          for(let i=1;i<10;i++)
          {
              sessionSuggestion =suggestions.map((element,index)=>{
                  return {key:index+1, value:element}
              })
          }
      }catch  {}
      sessionSuggestion.map((element) =>{
          switch (session) {
              case element.value :return this.setState({sessionNumber:element.key})
              default: return null
          }
      })

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

export default connect(state => ({studentData: state.studentData}))(withStyles(styles)(AttendancesSheet))
