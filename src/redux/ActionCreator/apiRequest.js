import {
    REQUEST_STUDENTS_SUCCESS,
    REQUEST_FAILED,
    REQUEST_ATTENDANCE_LINE_SUCCESS,
    REQUEST_ATTENDANCE_LINE_PENDING,
    REQUEST_ATTENDANCE_LINE_FAILED,
    TOGGLE_DIALOG,
    REQUEST_SUBJECT_DATA,
    PRINT_ATTENDANCE_REPORT,
    SET_REPORT_B64,
    GET_SESSION_DATA,
    SET_USER_IDENTITY,
    SET_FACULTY_TIMETABLE,
    SET_STUDENT_TIMETABLE,
    SET_TIMETABLE_VIEW,
    SET_EDIT_TT,
    SET_UID
} from '../../constants/env'
import {odooRequest, odooPrintReport} from '../api'
// Helper functino

// group data based on batch name
const groupByBatch = (data) =>  {
    let res = {}
    data.forEach(e => {
        let batch = e.batch_id[1]
        let course = e.course_id[1]
        let group = e.class_id[1]
        if(course in res){
            if(batch in res[course]){
                if(group in res[course][batch]){
                    res[course][batch][group].push(e)
                }else{
                    res[course][batch][group] = [e]
                }
            }else {
                let temp = {}
                temp[group] = [e]
                res[course][batch] = temp
            }
        }  else{
            res[course] = {}
            res[course][batch] = {}
            res[course][batch][group] = [e]
        }
    })
    return res
}

// Make request to odoo using xmlrpc or fetch request


// request student data
export const requestStudent= () => (dispatch) => {
    odooRequest('op.student', 'search_read', ['name', 'last_name', 'roll_number', 'class_id', 'batch_id', 'course_id'])
    .then(data => {
        dispatch({type: REQUEST_STUDENTS_SUCCESS, payload:groupByBatch(data)})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, data:err}))
}
// request subejct data

// export const requestSubject= () => (dispatch) => {
//     odooRequest('op.subject', 'search_read', ['name','id', 'batch_id', 'semester_id', 'class_id', 'code'])
//     .then(data => {
//         dispatch({type: REQUEST_SUBJECT_SUCCESS, payload:groupByBatch(data)})
//     })
//     .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
// }

// request session data 
// export const requestSession = () => (dispatch) => {
//     odooRequest('op.period', 'search_read', ['name', 'sequence'])
//     .then(data => {
//         dispatch({type: REQUEST_SESSION_SUCCESS, payload:data})
//     })
//     .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
// }
// request facility data 
// export const requestFaculty = () => (dispatch) => {
//     odooRequest('op.faculty', 'search_read', ['name', 'id'])
//     .then(data => {
//         dispatch({type: REQUEST_FACULTY_SUCCESS, payload:data})
//     })
//     .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
// }
// request course 
// export const requestCourse = () => (dispatch) => {
//     odooRequest('op.course', 'search_read', ['name', 'id'])
//     .then(data => {
//         dispatch({type: REQUEST_COURSE_SUCCESS, payload:data})
//     })
//     .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
// }
// request semester 
// export const requestSemester = () => (dispatch) => {
//     odooRequest('op.semester', 'search_read', ['name', 'id', 'batch_id', 'class_id'])
//     .then(data => {
//         dispatch({type: REQUEST_SEMESTER_SUCCESS, payload:groupByBatch(data)})
//     })
//     .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
// }

// request group data
// export const requestGroup = () => (dispatch) => {
//     odooRequest('op.class', 'search_read', ['name', 'id'])
//     .then(data => {
//         dispatch({type: REQUEST_GROUP_SUCCESS, payload:data})
//     })
//     .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
// }

export const createAttendanceSheet= (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/create-attendance-sheet',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: TOGGLE_DIALOG, payload: data}))
    .catch(err => dispatch({type: TOGGLE_DIALOG, payload: err}))
}

export const getAttendanceLine = (data) => (dispatch) => {
    dispatch({type: REQUEST_ATTENDANCE_LINE_PENDING})
    fetch('http://192.168.7.240:8008/get-attendance-line', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
    })
    .then(res => res.json())
    .then( data => dispatch({type: REQUEST_ATTENDANCE_LINE_SUCCESS, payload:JSON.parse(data.result)}))
    .catch(err => dispatch({type:REQUEST_ATTENDANCE_LINE_FAILED, payload:err}))
}

export const getSubjectData = () => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-subject-data')
    .then(res => res.json())
    .then(data => dispatch({type:REQUEST_SUBJECT_DATA, payload:data}))
    .catch( err => console.log(err))

}

export const getSessionData = () => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-session-data')
    .then(res => res.json())
    .then(data => dispatch({type:GET_SESSION_DATA, payload:data}))
    .catch( err => console.log(err))
}

export const printAttendanceReport = (data) => (dispatch) => {
    console.log({data});
    fetch('http://192.168.7.240:8008/print-attendance-report',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => {
        console.log('data',data)
        dispatch({type:SET_REPORT_B64, payload:JSON.parse(data.result).data})
        dispatch({type: PRINT_ATTENDANCE_REPORT, payload: JSON.parse(data.result).data})
    })
    .catch(err => dispatch({type: TOGGLE_DIALOG, payload: err}))

}

export const saveTimeTable = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/create-timetable',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: TOGGLE_DIALOG, payload: data}))
    .catch(err => dispatch({type: TOGGLE_DIALOG, payload: err}))
}

export const requestUserIdentity = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-user-identity',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_USER_IDENTITY, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestFacultyTimeTable = (data) => (dispatch) => {
    console.log('data',data);
    fetch('http://192.168.7.240:8008/get-faculty-timetable',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_FACULTY_TIMETABLE, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestStudentTimeTable = (data) => (dispatch) => {
    console.log('data',data);
    fetch('http://192.168.7.240:8008/get-student-timetable',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_STUDENT_TIMETABLE, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestTimeTableView = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-timetable-view',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_TIMETABLE_VIEW, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestTimeTableData = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-timetable-data',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_EDIT_TT, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const getUid = () => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-uid',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : {}
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_UID, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}
