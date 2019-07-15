import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, withStyles } from "@material-ui/core";
import HeadPicker from "../../components/Picker/HeadPicker";
import SessionTable from "../../components/Table/SessionTable";
import { connect } from "react-redux";
import { requestUserIdentity } from "../../redux/ActionCreator/apiRequest";
import ElevationScroll from "../NavigationBar/ElevationScroll";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  format: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 1400
  }
});

const AttendancesSheet = ({
  classes,
  props,
  dispatch,
  date,
  course,
  batch,
  group,
  faculty,
  semester,
  session,
  subjectInfo,
  userIden
}) => {
  let yyyy = "";
  let mm = "";
  let dd = "";
  if (date) {
    yyyy = date.getFullYear();
    mm =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  }

  let availableTab = [];
  let allSessions = [];
  try {
    if (Object.keys(subjectInfo).length !== 0) {
      allSessions = subjectInfo[course][batch][semester][group]["session"];
      let availableSession = Object.keys(
        userIden[course][batch][semester][group]
      );
      allSessions.forEach((e, i) => {
        if (availableSession.includes(e)) {
          availableTab.push(i + 1);
        }
      });
    }
  } catch {}

  useEffect(() => {
    if (date == "Invalid Date") return;
    if (!date) return;
    if (date > new Date()) return;
    dispatch(
      requestUserIdentity({
        date: `${yyyy}-${mm}-${dd}`,
        course,
        batch,
        group,
        faculty,
        semester
      })
    );
  }, [date, faculty, course, batch, group, semester]);

  const [sessionNumber, setSessionNumber] = useState(1);

  useEffect(() => {
    if (Object.keys(subjectInfo).length !== 0) {
      if (!session) return;
      setSessionNumber(
        subjectInfo[course][batch][semester][group]["session"].findIndex(
          e => e === session
        ) + 1
      );
    }
  }, [session]);

  const handleChangeSessionNumber = (event, sessionNumber) => {
    setSessionNumber(sessionNumber);
  };

  return (
    <div className={classes.format}>
      <h2>Attendance Sheet</h2>
      <ElevationScroll {...props}>
        <AppBar position="static" color="default" >
          <Tabs
            value={sessionNumber}
            onChange={handleChangeSessionNumber}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="on"
          >
            {availableTab.map(i => (
              <Tab label={"session " + i} key={i} value={i} />
            ))}
          </Tabs>
        </AppBar>
      </ElevationScroll>

      <HeadPicker sessionNumber={sessionNumber} userIden={userIden} />
      <SessionTable sessions={availableTab} sessionNumber={sessionNumber} />
    </div>
  );
};

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
}))(withStyles(styles)(AttendancesSheet));
