import React, {useState, useMemo, memo} from "react";
import { Route, Switch } from "react-router-dom"
import AdminGenerateTimeTable from '../components/Timetable/AdminGenerateTimetable'
import AdminTimeTableView from '../components/Timetable/AdminTimetableView'
import FacultyTimeTable from '../components/Timetable/FacultyTimetableView'
import StudentTimeTableView from '../components/Timetable/StudentTimetableView'
import moment from 'moment'
import {connect} from 'react-redux'


const AttendanceScreen = (props) => {

  const {subjectInfo, course, batch, semester, group} = props

  const [week, setWeek] = useState(moment.utc().week());
  const [weekStr, setWeekStr] = useState('');

  let currentWeek = ''
  let lastSemIndex = ''
  let endSemDate = useMemo(()=>{
    if(Object.keys(subjectInfo).length !== 0 && course){
      for(let semester in subjectInfo[course][batch]){
        for(let week of subjectInfo[course][batch][semester][group]['week']){
          let today = new Date()
          if(today >= new Date(week.startDate) && today <= new Date(week.endDate)){
            currentWeek = week.name
            setWeekStr(currentWeek)
            break
          }
        }
      }
      if(course && batch && semester){
        lastSemIndex = Object.keys(subjectInfo[course][batch])[Object.keys(subjectInfo[course][batch]).length -1]
        let lastWeekIndex = subjectInfo[course][batch][lastSemIndex][group]['week'].length -1
        try{
          endSemDate = subjectInfo[course][batch][semester][group]['week'][lastWeekIndex].endDate
        }catch{}
      }
    }
    return 'endSemDate'
  }, [subjectInfo, batch, course, group])

  const handleChangeWeekStr = value => {
    if(!value) return
    // let weekIdnex = subjectInfo[course][batch][semester][group]['week'].findIndex(e => e.name === value)
    // ('check---------->', subjectInfo[course][batch][semester][group]['week'][weekIdnex].startDate);
    // setWeek(moment(subjectInfo[course][batch][semester][group]['week'][weekIdnex].startDate, 'YYYY-MM-DD').utc().week())
    setWeekStr(value);
  };

  const handleLastWeek = () => {
    let weekInt = parseInt(weekStr.split(' ')[1]) -1
    let weekstr = ''
    if(weekInt <10)
      weekstr = 'W 0'+weekInt
    else weekstr = 'W '+ weekInt
    setWeek(week - 1);
    setWeekStr(weekstr)
  };

  const handleCurrentWeek = () => {
    setWeek(moment.utc().week());
    setWeekStr(currentWeek)
  };

  const handleNextWeek = () => {
    let weekInt = parseInt(weekStr.split(' ')[1]) +1
    let weekstr = ''
    if(weekInt <10)
      weekstr = 'W 0'+weekInt
    else weekstr = 'W '+ weekInt
    setWeekStr(weekstr)
    setWeek(week + 1);
  };

  const route = '/sms/timetable'
  return <Switch>
      <Route path = {`${route}/admin-view`} component={AdminTimeTableView} check={true} />
      <Route path = {`${route}/admin-create`}
        render={routerProps=>{
          return <AdminGenerateTimeTable
            handleChangeWeekStr={handleChangeWeekStr}
            handleLastWeek = {handleLastWeek}
            handleCurrentWeek = {handleCurrentWeek}
            handleNextWeek = {handleNextWeek}
            week={week}
            endSemDate = {endSemDate}
            weekStr={weekStr}
            {...props}
            {...routerProps}/>
        }
      }
      />
      <Route path = {`${route}/faculty`} 
       render={routerProps=>{
          return <FacultyTimeTable
            handleChangeWeekStr={handleChangeWeekStr}
            handleLastWeek = {handleLastWeek}
            handleCurrentWeek = {handleCurrentWeek}
            handleNextWeek = {handleNextWeek}
            week={week}
            endSemDate = {endSemDate}
            weekStr={weekStr}
            {...props}
            {...routerProps}/>}}/>
      <Route path = {`${route}/student`} component={StudentTimeTableView} />
      <Route
        render={routerProps=>{
          return <AdminGenerateTimeTable
            handleChangeWeekStr={handleChangeWeekStr}
            handleLastWeek = {handleLastWeek}
            handleCurrentWeek = {handleCurrentWeek}
            handleNextWeek = {handleNextWeek}
            week={week}
            endSemDate = {endSemDate}
            weekStr={weekStr}
            {...props}
            {...routerProps}/>
        }
         } />
  </Switch>
}
export default connect(state => ({
  subjectInfo: state.initData.subjectInfo,
  userIden: state.initData.userIden,
  course: state.changePicker.course,
  batch: state.changePicker.batch,
  semester: state.changePicker.semester,
  group: state.changePicker.group
}))(memo(AttendanceScreen))
