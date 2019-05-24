import {
    REQUEST_STUDENTS_SUCCESS,
    REQUEST_FAILED,
    REQUEST_SUBJECT_SUCCESS,
    REQUEST_SESSION_SUCCESS,
    REQUEST_SEMESTER_SUCCESS,
    REQUEST_FACULTY_SUCCESS,
    REQUEST_COURSE_SUCCESS,
    REQUEST_GROUP_SUCCESS,
    REQUEST_ATTENDANCE_LINE_SUCCESS,
    REQUEST_ATTENDANCE_LINE_PENDING,
    REQUEST_ATTENDANCE_LINE_FAILED,
    TOGGLE_DIALOG,
    REQUEST_SUBJECT_DATA
} from '../../constants/env'
import {odooRequest} from '../api'

// Helper functino 

// group data based on batch name 
const groupByBatch = (data) =>  {
    let res = {}
    data.forEach(e => {
        let batch = e.batch_id[1]
        if(batch in res){
            res[batch].push(e)
        }else {
            res[batch] = []
        }
    })
    return res
}

// Make request to odoo using xmlrpc or fetch request


// request student data
export const requestStudent= () => (dispatch) => {
    odooRequest('op.student', 'search_read', ['name', 'last_name', 'roll_number', 'batch_id'])
    .then(data => {
        dispatch({type: REQUEST_STUDENTS_SUCCESS, payload:groupByBatch(data)})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, data:err}))
}
// request subejct data

export const requestSubject= () => (dispatch) => {
    odooRequest('op.subject', 'search_read', ['name','id', 'batch_id', 'semester_id', 'class_id', 'code'])
    .then(data => {
        dispatch({type: REQUEST_SUBJECT_SUCCESS, payload:groupByBatch(data)})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
}

// request session data 
export const requestSession = () => (dispatch) => {
    odooRequest('op.period', 'search_read', ['name', 'sequence'])
    .then(data => {
        dispatch({type: REQUEST_SESSION_SUCCESS, payload:data})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
}
// request facility data 
export const requestFaculty = () => (dispatch) => {
    odooRequest('op.faculty', 'search_read', ['name', 'id'])
    .then(data => {
        dispatch({type: REQUEST_FACULTY_SUCCESS, payload:data})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
}
// request course 
export const requestCourse = () => (dispatch) => {
    odooRequest('op.course', 'search_read', ['name', 'id'])
    .then(data => {
        dispatch({type: REQUEST_COURSE_SUCCESS, payload:data})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
}
// request semester 
export const requestSemester = () => (dispatch) => {
    odooRequest('op.semester', 'search_read', ['name', 'id', 'batch_id', 'class_id'])
    .then(data => {
        dispatch({type: REQUEST_SEMESTER_SUCCESS, payload:groupByBatch(data)})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
}

// request group data
export const requestGroup = () => (dispatch) => {
    odooRequest('op.class', 'search_read', ['name', 'id'])
    .then(data => {
        dispatch({type: REQUEST_GROUP_SUCCESS, payload:data})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, payload:err}))
}

export const createAttendanceSheet= (data) => (dispatch) => {
    fetch('http://localhost:8069/create-attendance-sheet',{
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

export const getAttendanceLine = () => (dispatch) => {
    dispatch({type: REQUEST_ATTENDANCE_LINE_PENDING})
    fetch('http://localhost:8069/get-attendance-line')
    .then(res => res.json())
    .then( data => dispatch({type: REQUEST_ATTENDANCE_LINE_SUCCESS, payload:data.data}))
    .catch(err => dispatch({type:REQUEST_ATTENDANCE_LINE_FAILED, payload:err}))
}

export const getSubjectData = () => (dispatch) => {
    fetch('http://localhost:8069/get-subject-data')
    .then(res => res.json())
    .then(data => dispatch({type:REQUEST_SUBJECT_DATA}))
    .catch( err => console.log(err))
}