import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow
} from "@material-ui/core";
import DisplayTimetableHeader from "../TimetablePicker/DisplayTimetableHeader";
import FacultyDateNavigator from "./FacultyDateNavigator";
import { requestStudentTimeTable } from "../../redux/ActionCreator/apiRequest";
import { connect } from "react-redux";
import moment from "moment";
import CustomTableCell from "../Table/CustomTableCell";
import tableStyle from "../Table/TableStyle";

const weekOfYear = moment.utc().week();

const StudentView = ({ dispatch, studentTT }) => {
  const [week, setWeek] = useState(weekOfYear);

  const handleLastWeek = () => {
    setWeek(week - 1);
  };

  const handleCurrentWeek = () => {
    setWeek(weekOfYear);
  };

  const handleNextWeek = () => {
    setWeek(week + 1);
  };

  useEffect(() => {
    dispatch(
      requestStudentTimeTable({
        date: moment("2017-11-05", "YYYY-MM-DD").format("YYYY-MM-DD")
      })
    );
  }, [week]);

  useEffect(()=>{
      dispatch(requestStudentTimeTable({date:moment.utc().week(week).weekday(0).format('YYYY-MM-DD')}))
  }, [week])
  const header = ["Session"];

  for (let i = 0; i < 7; i++) {
    header.push(
      moment
        .utc()
        .week(week)
        .weekday(i)
        .format("ddd MM/DD")
    );
  }

  const classes = tableStyle();

  return (
    <div className={classes.format}>
      <FacultyDateNavigator
        week={week}
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
              {Object.keys(studentTT).map(session => {
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
  studentTT: state.initData.studentTT
}))(StudentView);
