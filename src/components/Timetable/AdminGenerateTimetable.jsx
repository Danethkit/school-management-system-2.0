import React, { useState, useMemo, memo } from "react";
import TimeTableSearchBox from "../TimetablePicker/TimeTableSearchBox";
import DateNavigator from "./DateNavigator";
import moment from "moment";
import TimeTable from "./TimeTable";
import DefaultAlert from '../../components/Alert/DefaultDialog'
import { Announcement } from '@material-ui/icons'

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

const areEqual = (prevProps, nextProps) => {
  if (
    nextProps.course === null &&
    (prevProps.batch !== nextProps.batch ||
      prevProps.semester !== nextProps.semester ||
      prevProps.group !== nextProps.group)
  ) {
    return true;
  }
  if (
    nextProps.batch === null &&
    (prevProps.semester !== nextProps.semester ||
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
  if (group && semester && batch && course) {
    let session = data[course][batch][semester]["session"];
    if (session.length !== 0) {
      res.push({
        course: course,
        batch: batch,
        semester: semester,
        group: group,
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
      let session = data[course][batch][semester]["session"];
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
        let session = data[course][batch][semester]["session"];
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
          let session = data[course][batch][semester]["session"];
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
            let session = data[course][batch][semester]["session"];
            if (session.length === 0) continue;
            let header = { course, batch, semester, group, session };
            res.push(header);
          }
        }
      }
    }
  }
  return res;
};

const AdminTimeTable = ({weekStr, handleChangeWeekStr, handleCurrentWeek, handleLastWeek, handleNextWeek, ...others  }) => {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [warning, setWarning] = useState(false)

  const {subjectInfo, course, batch, semester, group, week, endSemDate} = others

  var res = weekStr && Object.keys(data).length !== 0 ? data.res : {};

  const onFacultyInsert = (row, col, value, header) => {
    if(!weekStr) return setWarning(true)
    let temp = {};
    let temp2 = {};
    temp2[row] = value;
    let { course, batch, semester, group } = header;
    if(weekStr in res){
      if (course in res[weekStr]) {
        if (batch in res[weekStr][course]) {
          if (semester in res[weekStr][course][batch]) {
            if (group in res[weekStr][course][batch][semester]) {
              if (col in res[weekStr][course][batch][semester][group]) {
                res[weekStr][course][batch][semester][group][col][row] = value;
              } else {
                res[weekStr][course][batch][semester][group][col] = temp2;
              }
            } else {
              assign(temp, [col, row], value);
              res[weekStr][course][batch][semester][group] = temp;
            }
          } else {
            assign(temp, [group, col, row], value);
            res[weekStr][course][batch][semester] = temp;
          }
        } else {
          assign(temp, [semester, group, col, row], value);
          res[weekStr][course][batch] = temp;
        }
      } else {
        assign(res, [course, batch, semester, group, col, row], value);
      }
    } else {
      assign(res, [weekStr, course, batch, semester, group, col, row], value);
    }
    setData({res});
  };

  const handleCloseWarning = () => {
    setWarning(false)
  }

  // useMemo is for performance improvement, if the dependencies still the same function won't execute, instead it directly return the cached reasult
  let allTables = [];
  allTables = useMemo(() => {
    return filterTable(subjectInfo, course, batch, semester, group);
  }, [subjectInfo, course, batch, semester, group]);

  let columns = []
  if(Object.keys(subjectInfo).length !== 0 && semester){
    if(subjectInfo[course][batch][semester]['week'].length !== 0){
      let weekIndex = subjectInfo[course][batch][semester]['week'].findIndex(e => e.name === weekStr)
      if(weekIndex === -1) weekIndex = 0
      columns = ["Session"];
      for (let i = 1; i < 7; i++) {
        columns.push(
          moment(subjectInfo[course][batch][semester]['week'][weekIndex].startDate, 'YYYY-MM-DD')
            .add(i, 'days')
            .utc()
            .format("ddd MM/DD")
      );
    }
    }
  }

  let weekStartDate = ''
  let weekEndDate = ''
  if(Object.keys(subjectInfo).length !== 0 && semester){
    for(let week of subjectInfo[course][batch][semester]['week']){
      if(week.name === weekStr){
        weekStartDate = week.startDate
        weekEndDate = week.endDate
      }
    }
  }
  return (
    <>
      <TimeTableSearchBox setWeekNumber={handleChangeWeekStr} value={weekStr} />
      <DateNavigator
        week={week}
        weekStr={weekStr}
        endSemDate = {endSemDate}
        handleLastWeek={handleLastWeek}
        handleNextWeek={handleNextWeek}
        handleCurrentWeek={handleCurrentWeek}
        open={open}
        setOpen={setOpen}
        weekEndDate = {weekEndDate}
        weekStartDate = {weekStartDate}
      />
      {allTables.map((table, i) => {
        let faculties = [];
        try {
          for (let e of subjectInfo[table.course][table.batch][table.semester][
            table.group
          ]) {
            if (e.faculty) {
              faculties.push(`${e.subject} (${e.faculty})`);
            }
          }
        } catch {}
        return (
          <TimeTable
            week={week}
            header={table}
            onDataInsert={onFacultyInsert}
            sessions={table.session}
            key={i}
            facultyData={faculties}
            selectedFaculty={data}
            weekStr = {weekStr}
            columns = {columns}
          />
        );
      })}
      <DefaultAlert
          icon
          onClick={handleCloseWarning}
          title = "You must select week first"
          open={warning}/>
    </>
  );
};

export default memo(AdminTimeTable, areEqual)
