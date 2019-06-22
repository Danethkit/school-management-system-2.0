import React, { useState, useMemo, memo, useEffect } from "react";
import TimeTableSearchBox from "../TimetablePicker/TimeTableSearchBox";
import DateNavigator from "./DateNavigator";
import { connect } from "react-redux";
import moment from "moment";
import TimeTable from "./TimeTable";


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

const AdminTimeTable = ({ course, batch, semester, group, subjectInfo }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [week, setWeek] = useState(moment.utc().week());
  const [weekStr, setWeekStr] = useState('');
  let currentWeek = ''
  let endSemDate = useMemo(()=>{
    if(Object.keys(subjectInfo).length !== 0){
      for(let semester in subjectInfo[course][batch]){
        for(let week of subjectInfo[course][batch][semester]['week']){
          let today = new Date()
          if(today >= new Date(week.startDate) && today <= new Date(week.endDate)){
            currentWeek = week.name
            break
          }
        }
      }
      if(course && batch && semester){
        endSemDate = subjectInfo[course][batch][semester]['week'][subjectInfo[course][batch][semester]['week'].length -1].endDate
      }
    }
    return endSemDate
  }, [subjectInfo])

  useEffect(()=>{
    if(currentWeek) setWeekStr(currentWeek)
  }, [subjectInfo])

  const handleChangeWeekStr = value => {
    setWeekStr(value);
  };

  const handleLastWeek = () => {
    setWeek(week - 1);
    setWeekStr(`W ${parseInt(weekStr.split(' ')[1]) -1} `)
  };
  const handleCurrentWeek = () => {
    setWeek(moment.utc().week());
    setWeekStr(currentWeek)
  };
  const handleNextWeek = () => {
    setWeekStr(`W ${parseInt(weekStr.split(' ')[1]) +1}`)
    setWeek(week + 1);
  };
  var res = data.res || {};

  const onFacultyInsert = (row, col, value, header) => {
    let temp = {};
    let temp2 = {};
    temp2[row] = value;
    let { course, batch, semester, group } = header;
    if (course in res) {
      if (batch in res[course]) {
        if (semester in res[course][batch]) {
          if (group in res[course][batch][semester]) {
            if (col in res[course][batch][semester][group]) {
              res[course][batch][semester][group][col][row] = value;
            } else {
              res[course][batch][semester][group][col] = temp2;
            }
          } else {
            assign(temp, [col, row], value);
            res[course][batch][semester][group] = temp;
          }
        } else {
          assign(temp, [group, col, row], value);
          res[course][batch][semester] = temp;
        }
      } else {
        assign(temp, [semester, group, col, row], value);
        res[course][batch] = temp;
      }
    } else {
      assign(res, [course, batch, semester, group, col, row], value);
    }
    temp[weekStr] = res
    console.log('week str----------', weekStr);
    setData({res:temp});
  };
  console.log('check data=============', data);

  // useMemo is for performance improvement, if the dependencies still the same function won't execute, instead it directly return the cached reasult
  let allTables = [];
  allTables = useMemo(() => {
    return filterTable(subjectInfo, course, batch, semester, group);
  }, [subjectInfo, course, batch, semester, group]);

  let columns = ["Session"];
  for (let i = 0; i < 7; i++) {
    columns.push(
      moment
        .utc()
        .week(week)
        .weekday(i)
        .format("ddd MM/DD")
    );
  }
  // let period = ''
  return (
    <>
      <TimeTableSearchBox tsetWeekNumber={handleChangeWeekStr} value={weekStr} />
      <DateNavigator
        week={week}
        weekStr={weekStr}
        endSemDate = {endSemDate}
        handleLastWeek={handleLastWeek}
        handleNextWeek={handleNextWeek}
        handleCurrentWeek={handleCurrentWeek}
        open={open}
        setOpen={setOpen}
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
            week={weekStr}
            header={table}
            onDataInsert={onFacultyInsert}
            sessions={table.session}
            key={i}
            facultyData={faculties}
            selectedFaculty={data}
            // dayOff = {period}
          />
        );
      })}
    </>
  );
};

export default connect(state => ({
  sessionData: state.initData.sessionData,
  subjectInfo: state.initData.subjectInfo,
  course: state.changePicker.course,
  batch: state.changePicker.batch,
  semester: state.changePicker.semester,
  group: state.changePicker.group
}))(memo(AdminTimeTable, areEqual));
