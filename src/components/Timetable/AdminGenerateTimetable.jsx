import React, {useState, useMemo, memo} from 'react'
import TimeTableSearchBox from "../TimetablePicker/TimeTableSearchBox";
import DateNavigator from './DateNavigator'
import { connect } from 'react-redux'
import moment from 'moment'
import TimeTable from './TimeTable'




const weekOfYear = moment.utc().week();

// filter number of tables based on TimeTableSearchBoxComponent
// filter parameter : course, batch, semester , group are recieved as props from redux store
const filterTable=(data, course=false, batch=false,semester =false,group=false)=>{
    let res = []
    if(Object.keys(data).length === 0) {
        return res
    }
    if(group && semester && batch && course){
            let session = data[course.value][batch.value][semester.value][group.value]
            res.push({course:course.value,batch:batch.value,semester:semester.value,group:group.value,session})
        return res
    }
    if(semester && batch && course){
        for(const group in data[course.value][batch.value][semester.value] ){
            let session = data[course.value][batch.value][semester.value][group]
            res.push({course:course.value,batch:batch.value,semester:semester.value,group,session})
        }
        return res
    }
    if(batch && course){
        for(const semester in data[course.value][batch.value]){
            for(const group in data[course.value][batch.value][semester]){
                let session = data[course.value][batch.value][semester][group]
                let header = {semester, group, session}
                header['course'] = course.value
                header['batch'] = batch.value
                res.push(header)
            }
        }
        return res
    }
    if(course){
        for(const batch in data[course.value]){
            for(const semester in data[course.value][batch]){
                for(const group in data[course.value][batch][semester] ){
                    let session = data[course.value][batch][semester][group]
                    let header = {batch,semester,group,session}
                    header['course'] = course.value
                    res.push(header)
                }
            }
        }
        return res
    }
    return res
}


const AdminTimeTable = memo(({sessionData, course, batch, semester, group, subjectInfo})=> {
    const [week, setWeek] = useState(weekOfYear)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    const [weekNumber, setWeekNum] = useState({label:1,value:1})

    const setWeekNumber = (value) => {
        setWeekNum(value)
    }

    const handleLastWeek = () => {
        setWeek(week-1)
    };
    const handleCurrentWeek = () => {
        setWeek(weekOfYear)
    }
    const handleNextWeek = () => {
        setWeek(week+1)
    };

    const onFacultyInsert = (row, col, value, header) => {
        let res = {}
        let {course, batch, semester, group} = header
        
        if(course in res){
            if(batch in res[course]){
                if(semester in res[course][batch]){
                    if(group in res[course][batch][semester]){
                        if(col in res[course][batch][semester][group]){
                            res[course][batch][semester][group][col].push(value)
                        }else {
                            res[course][batch][semester][group][col] = [value]
                        }
                    }else {
                        res[course][batch][semester][group]={col:[value]}
                    }
                }else{
                    res[course][batch][semester] = {group:{col:[value]}}
                }
            }else{
                res[course][batch] = {semester:{group:{col:[value]}}}
            }
        }else{
            let temp = {}
            temp[batch] = {semester:{}}
            temp[batch][semester] = {group:null}
            temp[batch][semester][group] = {col:null}
            temp[batch][semester][group][col] = [value]
            res[course] = temp
        }
        console.log('chekc res ++++++++++++++',res)
    };
    // useMemo is for performance improvement, if the dependencies still the same function won't execute, instead it directly return the cached reasult
    const allTables = useMemo(() => {
        return filterTable(sessionData, course, batch, semester, group)
    }, [sessionData, course, batch, semester, group]);

    let columns = ['Session']
    for(let i=0; i<7; i++){
        columns.push(moment.utc().week(week).weekday(i).format("ddd MM/DD"))
    }
    return(
        <>
        <TimeTableSearchBox setWeekNumber={setWeekNumber} value={weekNumber}/>
        <DateNavigator
            week={week}
            handleLastWeek={handleLastWeek}
            handleNextWeek={handleNextWeek}
            handleCurrentWeek={handleCurrentWeek}
            open = {open}
            setOpen = {setOpen}
        />
        {
            allTables.map((table,i) => {
                let faculties = []
                try{
                    faculties = subjectInfo[table.course][table.batch][table.semester][table.group].map(e => {
                        if(e.faculty){
                            return `${e.subject} (${e.faculty})`
                        }
                        return null
                    })
                }catch{}
                return <TimeTable 
                        week={week} 
                        header={table} 
                        onDataInsert={onFacultyInsert}
                        sessions={table.session} key={i} 
                        facultyData={faculties}/>
            }) 
        }
        </>
        )
})

export default connect(state =>({
    sessionData:state.initData.sessionData,
    subjectInfo: state.initData.subjectInfo,
    course: state.changePicker.course,
    batch: state.changePicker.batch,
    semester: state.changePicker.semester,
    group: state.changePicker.group,
}))(AdminTimeTable)