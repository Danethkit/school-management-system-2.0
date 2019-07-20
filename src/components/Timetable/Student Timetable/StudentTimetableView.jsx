import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow
} from "@material-ui/core";
import DisplayTimetableHeader from "../DisplayTimetableHeader";
import FacultyDateNavigator from "../FacultyDateNavigator";
import { requestStudentTimeTable } from "../../../redux/ActionCreator/apiRequest";
import { connect } from "react-redux";
import moment from "moment";
import CustomTableCell from "../../Table/CustomTableCell";
import tableStyle from "../../Table/TableStyle";

const weekOfYear = moment.utc().week();

const StudentView = ({ dispatch, studentTT, subjectInfo }) => {

  let currentWeekIndex = -1

  const [weekIndex, setWeekIndex] = useState(0)

  const handleLastWeek = () => {
    setWeekIndex(weekIndex - 1);
  };

  const handleCurrentWeek = () => {
    setWeekIndex(currentWeekIndex);
  };

  const handleNextWeek = () => {
    setWeekIndex(weekIndex + 1);

  };

  const sortSession = (a, b) => moment(a.split('-')[0], 'h:mma') - moment(b.split('-')[0], 'h:mma')

  var weeks = []
  if(studentTT.header !== undefined && Object.keys(subjectInfo).length !== 0){
    const {course, batch, semester, group} = studentTT.header
    weeks = subjectInfo[course][batch][semester][group]['week']
  }


  useEffect(()=> {
    if(studentTT.header !== undefined && Object.keys(subjectInfo).length !== 0){
      currentWeekIndex = weeks.findIndex(e => moment() >= moment(e.startDate, 'YYYY-MM-DD') && moment() <= moment(e.endDate, 'YYYY-MM-DD'))
      if(weekIndex === 0) setWeekIndex(currentWeekIndex)
    }
  }, [subjectInfo, studentTT])



  useEffect(()=>{
    if(weeks.length !== 0)
      dispatch(requestStudentTimeTable({week: weeks[weekIndex].id, date:moment().utc().format('YYYY-MM-DD')}))
    else  dispatch(requestStudentTimeTable({week: false, date:moment().utc().format('YYYY-MM-DD')}))
  }, [weekIndex])



  const header = ["Session"];

  if(weeks.length !== 0){
    for (let i = 0; i < 7; i++) {
      header.push(
        moment(weeks[weekIndex].startDate, 'YYYY-MM-DD')
        .add(i, 'days')
        .utc()
        .format("ddd MM/DD")
      );
    }
  }

  const classes = tableStyle();

  return (
    <div className={classes.format}>
      <FacultyDateNavigator
        week={weeks.length !== 0 ? moment(weeks[weekIndex].startDate, 'YYYY-MM-DD').week(): 1}
        handleLastWeek={handleLastWeek}
        handleNextWeek={handleNextWeek}
        handleCurrentWeek={handleCurrentWeek}
        weekOfYear={weekOfYear}
      />
      <DisplayTimetableHeader
        header={studentTT["header"]}
        week={
          Object.keys(studentTT).length !== 0
            ? studentTT["header"]["week"]
            : null
        }
      />

      <div className={classes.container}>
        <Paper className={classes.subRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.row}>
                {header.map(item => (
                  <CustomTableCell align="center" multiline={"true"} key={item}>
                    {item}
                  </CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(studentTT).sort(sortSession).map(session => {
                if (session === "header") return null;
                const temp = [];
                for (let i = 0; i < 7; i++) {
                  temp.push(
                    <CustomTableCell align="center" key={i}>
                      {i + 1 in studentTT[session]
                        ? studentTT[session][i + 1]
                        : null}
                    </CustomTableCell>
                  );
                }
                return (
                  <TableRow className={classes.row} key={session}>
                    <CustomTableCell align="center">{session}</CustomTableCell>
                    {temp}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default connect(state => ({
  studentTT: state.initData.studentTT,
  subjectInfo: state.initData.subjectInfo
}))(StudentView);
