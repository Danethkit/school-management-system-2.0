import {
    REQUEST_SESSION_SUCCESS,
    REQUEST_STUDENTS_SUCCESS,
    REQUEST_FAILED,
    REQUEST_SUBJECT_SUCCESS,
    REQUEST_SEMESTER_SUCCESS,
    REQUEST_FACULTY_SUCCESS,
    REQUEST_COURSE_SUCCESS,
    REQUEST_GROUP_SUCCESS,
    REQUEST_ATTENDANCE_LINE_SUCCESS,
    REQUEST_ATTENDANCE_LINE_PENDING,
    REQUEST_ATTENDANCE_LINE_FAILED,
    REQUEST_SUBJECT_DATA
} from '../../constants/env'

const initialData = {
    studentData : [],
    error: '',
    subjectData :[],
    sessionData : [],
    courseData: [],
    semesterData: {},
    groupData: [],
    facultyData: [],
    attendanceLine : [],
    initDataPending: false,
    requestAttendanceLinePending: false,
    subjectInfo : {}
}

export const initData = (state= initialData, action={}) => {
    switch(action.type){
        case REQUEST_FAILED:
            return Object.assign({}, state, {error: action.payload})
        case REQUEST_STUDENTS_SUCCESS:
            return Object.assign({}, state, {studentData: action.payload, initDataPending:false})
        case REQUEST_SUBJECT_SUCCESS:
            return Object.assign({}, state, {subjectData: action.payload})
        case REQUEST_SESSION_SUCCESS:
            return Object.assign({}, state, {sessionData: action.payload})
        case REQUEST_COURSE_SUCCESS:   
            return Object.assign({}, state, {courseData: action.payload})
        case REQUEST_SEMESTER_SUCCESS:
            return Object.assign({}, state, {semesterData: action.payload})
        case REQUEST_FACULTY_SUCCESS:
            return Object.assign({}, state, {facultyData: action.payload})
        case REQUEST_GROUP_SUCCESS:
            return Object.assign({}, state, {groupData: action.payload})
        case REQUEST_ATTENDANCE_LINE_SUCCESS:
            return {...state, ...{attendanceLine:action.payload}}
        case REQUEST_ATTENDANCE_LINE_PENDING:
            return {...state, ...{requestAttendanceLinePending:true}}
        case REQUEST_ATTENDANCE_LINE_FAILED:
            return {...state, ...{requestAttendanceLineFalied:true}}
        case REQUEST_SUBJECT_DATA:
            return { ...state, ...{subjectInfo:action.payload}}
        default:
            return state
    }
}
