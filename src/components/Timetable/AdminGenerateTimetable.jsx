import React, { memo, Component } from "react";
import TimeTableSearchBox from "../TimetablePicker/TimeTableSearchBox";
import DateNavigator from "./DateNavigator";
import moment from "moment";
import TimeTable from "./TimeTable";
import DefaultAlert from "../../components/Alert/DefaultDialog";
import { Prompt } from "react-router-dom";
import ToggleButton from "../Picker/ToggleButton";
import AdminTimeTableTreeView from "../Table/AdminTimeTableTreeView";
import Report from "@material-ui/icons/Report";
import Typography from "@material-ui/core/Typography";

// helper functoin to asign nested key object
function assign(obj, keyPath, value) {
  const lastKeyIndex = keyPath.length - 1;
  for (var i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i];
    if (!(key in obj)) obj[key] = {};
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
}

const weekday = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const areEqual = (prevProps, nextProps) => {
  if (
    nextProps.course === null &&
    (prevProps.batch !== nextProps.batch &&
      prevProps.semester !== nextProps.semester &&
      prevProps.group !== nextProps.group)
  ) {
    return true;
  }
  if (
    nextProps.batch === null &&
    (prevProps.semester !== nextProps.semester &&
      prevProps.group !== nextProps.group)
  ) {
    return true;
  }
  return false;
};
// filter number of tables based on TimeTableSearchBoxComponent
// filter parameter : course, batch, semester , group are recieved as props from redux store
const filterTable = (
  data,
  course = false,
  batch = false,
  semester = false,
  group = false
) => {
  let res = [];
  if (Object.keys(data).length === 0) {
    return res;
  }
  try {
    if (group && semester && batch && course) {
      let session = data[course][batch][semester][group]["session"];
      if (!session) return res;
      if (session.length !== 0) {
        res.push({
          course,
          batch,
          semester,
          group,
          session
        });
      }
      return res;
    }
    if (semester && batch && course) {
      for (const group in data[course][batch][semester]) {
        if (!group.includes("Group")) {
          continue;
        }
        let session = data[course][batch][semester][group]["session"];
        if (!session) continue;
        if (session.length === 0) continue;
        res.push({
          course: course,
          batch: batch,
          semester: semester,
          group,
          session
        });
      }
      return res;
    }
    if (batch && course) {
      for (const semester in data[course][batch]) {
        for (const group in data[course][batch][semester]) {
          let session = data[course][batch][semester][group]["session"];
          if (!session) continue;
          if (session.length === 0) continue;
          let header = { course, batch, semester, group, session };
          res.push(header);
        }
      }
      return res;
    }
    if (course) {
      for (const batch in data[course]) {
        for (const semester in data[course][batch]) {
          for (const group in data[course][batch][semester]) {
            let session = data[course][batch][semester][group]["session"];
            if (!session) continue;
            if (session.length === 0) continue;
            let header = { course, batch, semester, group, session };
            res.push(header);
          }
        }
      }
      return res;
    } else {
      for (const course in data) {
        for (const batch in data[course]) {
          for (const semester in data[course][batch]) {
            for (const group in data[course][batch][semester]) {
              let session = data[course][batch][semester][group]["session"];
              if (!session) continue;
              if (session.length === 0) continue;
              let header = { course, batch, semester, group, session };
              res.push(header);
            }
          }
        }
      }
    }
  } catch {}
  return res;
};
// weekStr, handleChangeWeekStr, handleCurrentWeek, handleLastWeek, handleNextWeek, ...others
// const {subjectInfo, course, batch, semester, group, week, endSemDate} = others

class AdminTimeTable extends Component {
  clickHandlers = {};
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: {},
      warning: false,
      mode: "create"
    };
  }

  onFacultyInsert = (row, col, value, header) => {
    const { weekStr } = this.props;
    const { data } = this.state;
    if (!weekStr) return this.setState({ warning: true });
    let temp = {};
    let temp2 = {};
    temp2[row] = value;
    let { course, batch, semester, group } = header;
    if (weekStr in data) {
      if (course in data[weekStr]) {
        if (batch in data[weekStr][course]) {
          if (semester in data[weekStr][course][batch]) {
            if (group in data[weekStr][course][batch][semester]) {
              if (col in data[weekStr][course][batch][semester][group]) {
                data[weekStr][course][batch][semester][group][col][row] = value;
              } else {
                data[weekStr][course][batch][semester][group][col] = temp2;
              }
            } else {
              assign(temp, [col, row], value);
              data[weekStr][course][batch][semester][group] = temp;
            }
          } else {
            assign(temp, [group, col, row], value);
            data[weekStr][course][batch][semester] = temp;
          }
        } else {
          assign(temp, [semester, group, col, row], value);
          data[weekStr][course][batch] = temp;
        }
      } else {
        assign(data, [course, batch, semester, group, col, row], value);
      }
    } else {
      assign(data, [weekStr, course, batch, semester, group, col, row], value);
    }
    this.setState({ data: { ...data } });
  };

  handleCloseWarning = () => {
    this.setState({ warning: false });
  };

  openDuplicateDialog = boo => {
    this.setState({ open: boo });
  };

  handleDuplicateTimetable = selected => {
    const { weekStr, subjectInfo, course, batch, semester, group } = this.props;
    let { data } = this.state;
    if (!weekStr) return;
    selected.forEach(w => {
      let temp2 = {};
      let temp = data[weekStr][course][batch][semester][group];
      for (let day in temp) {
        let weekIndex = subjectInfo[course][batch][semester][group][
          "week"
        ].findIndex(e => e.name === w);
        let keyDay = moment(
          subjectInfo[course][batch][semester][group]["week"][weekIndex]
            .startDate,
          "YYYY-MM-DD"
        )
          .weekday(weekday[day.split(" ")[0]])
          .format("ddd MM/DD");
        Object.keys(temp[day]).forEach(k => {
          if (keyDay in temp2) {
            temp2[keyDay][k] = temp[day][k];
          } else {
            temp2[keyDay] = {};
            temp2[keyDay][k] = temp[day][k];
          }
        });
        assign(data, [w, course, batch, semester, group], temp2);
      }
    });
    this.setState({ data: { ...data } });
  };

  getClickHandler = key => {
    if (!Object.prototype.hasOwnProperty.call(this.clickHandlers, key)) {
      this.clickHandlers[key] = (col, row, value, header) =>
        this.onFacultyInsert(col, row, value, header);
    }
    return this.clickHandlers[key];
  };

  onChangeMode = mode => {
    if (mode === this.state.mode) return;
    this.setState({ mode });
  };

  render() {
    const {
      weekStr,
      handleChangeWeekStr,
      handleCurrentWeek,
      handleLastWeek,
      handleNextWeek,
      ...others
    } = this.props;
    const {
      subjectInfo,
      course,
      batch,
      semester,
      group,
      week,
      dispatch
    } = others;

    const { data, open, warning, mode } = this.state;
    let allTables = filterTable(subjectInfo, course, batch, semester, group);
    let weekStartDate = "";
    let weekEndDate = "";
    try {
      for (let week of subjectInfo[course][batch][semester][group]["week"]) {
        if (week.name === weekStr) {
          weekStartDate = week.startDate;
          weekEndDate = week.endDate;
        }
      }
    } catch {}

    return (
      <div
        style={{
          backgroundColor: '#efefef',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          maxWidth: 1400,
        }}
      >
        <div style={{margin:'auto', width:'40vh', marginBottom:20}}><Typography variant='h4'><b>Generate Timetable</b></Typography></div>
        <Prompt
          when={Object.keys(data).length === 0 ? false : true}
          message="You have unsaved changes, are you sure you want to leave?"
        />
        <TimeTableSearchBox
          setWeekNumber={handleChangeWeekStr}
          value={weekStr}
        />
        <DateNavigator
          week={week}
          weekStr={weekStr}
          handleLastWeek={handleLastWeek}
          handleNextWeek={handleNextWeek}
          handleCurrentWeek={handleCurrentWeek}
          open={open}
          setOpen={this.openDuplicateDialog}
          weekEndDate={weekEndDate}
          weekStartDate={weekStartDate}
          handleDuplicateTimetable={this.handleDuplicateTimetable}
          {...others}
        />
        <div>
          <ToggleButton onChange={this.onChangeMode} mode={mode} />
        </div>
        {mode === "view" ? (
          <AdminTimeTableTreeView dispatch={dispatch} {...others} />
        ) : (
          <>
            {allTables.map((table, i) => {
              let faculties = [];
              try {
                for (let e of subjectInfo[table.course][table.batch][
                  table.semester
                ][table.group]["subjects"]) {
                  if (e.faculty) {
                    faculties.push(`${e.subject} ~ ${e.faculty}`);
                  }
                }
              } catch {}
              return (
                <TimeTable
                  week={week}
                  header={table}
                  onDataInsert={this.getClickHandler}
                  sessions={table.session}
                  key={i}
                  facultyData={faculties}
                  selectedFaculty={data}
                  weekStr={weekStr}
                  {...others}
                />
              );
            })}
          </>
        )}
        <DefaultAlert
          icon={
            <Report
              style={{
                width: 150,
                height: 150,
                marginLeft: 60,
                marginRight: 60,
                marginTop: 30
              }}
              color="secondary"
            />
          }
          onClick={this.handleCloseWarning}
          detail="You must select week first"
          open={warning}
        />
      </div>
    );
  }
}

export default memo(AdminTimeTable, areEqual);
