import {
    REQUEST_STUDENTS_SUCCESS,
    REQUEST_FAILED,
    REQUEST_SUBJECT_SUCCESS,
    REQUEST_ATTENDANCE_LINE_SUCCESS,
    REQUEST_ATTENDANCE_LINE_PENDING,
    REQUEST_ATTENDANCE_LINE_FAILED,
    REQUEST_SUBJECT_DATA,
    PRINT_ATTENDANCE_REPORT,
    GET_SESSION_DATA,
    SET_REPORT_B64,
    SET_USER_IDENTITY,
    SET_FACULTY_TIMETABLE,
    SET_STUDENT_TIMETABLE,
    SET_TIMETABLE_VIEW,
    SET_EDIT_TT,
    SET_UID,
    SET_SEM_DATE,
    SET_ATTENDANCE_REPORT_DATA
} from '../../constants/env'

const initialData = {
    studentData : [],
    error: '',
    subjectData :[],
    courseData: [],
    semesterData: {},
    groupData: [],
    facultyData: [],
    attendanceLine : {},
    initDataPending: false,
    requestAttendanceLinePending: false,
    subjectInfo : {},
    report: false,
    b64Report : '',
    sessionData: {},
    userIden: {},
    facultyTT : {},
    studentTT: {},
    TTView:{},
    editTT: {},
    uid: {},
    editTTStatus: {},
    semDate: [],
    attendanceReportData: {}
}

export const initData = (state= initialData, action={}) => {
    switch(action.type){
        case REQUEST_FAILED:
            return Object.assign({}, state, {error: action.payload})
        case REQUEST_STUDENTS_SUCCESS:
            return Object.assign({}, state, {studentData: action.payload, initDataPending:false})
        case REQUEST_SUBJECT_SUCCESS:
            return Object.assign({}, state, {subjectData: action.payload})
        case REQUEST_ATTENDANCE_LINE_SUCCESS:
            return {...state, ...{attendanceLine:action.payload}}
        case REQUEST_ATTENDANCE_LINE_PENDING:
            return {...state, ...{requestAttendanceLinePending:true}}
        case REQUEST_ATTENDANCE_LINE_FAILED:
            return {...state, ...{requestAttendanceLineFalied:true}}
        case REQUEST_SUBJECT_DATA:
            return { ...state, ...{subjectInfo:action.payload}}
        case PRINT_ATTENDANCE_REPORT:
            return {...state,...{reportOpen:action.payload}}
        case SET_REPORT_B64:
            return {...state,...{b64Report:action.payload}}
        case GET_SESSION_DATA:
            return {...state, ...{sessionData:action.payload}}
        case SET_USER_IDENTITY:
            return {...state, ...{userIden:action.payload}}
        case SET_FACULTY_TIMETABLE:
            return {...state, ...{facultyTT:action.payload}}
        case SET_STUDENT_TIMETABLE:
            return {...state, ...{studentTT:action.payload}}
        case SET_TIMETABLE_VIEW:
            return {...state, ...{TTView:action.payload}}
        case SET_EDIT_TT:
            return {...state, ...{editTT:action.payload}}
        case SET_UID:
            return {...state, ...{uid:action.payload}}
        case SET_SEM_DATE:
            return {...state, ...{semDate:action.payload}}
        case SET_ATTENDANCE_REPORT_DATA:
            return {...state, ...{attendanceReportData:action.payload}}
        default:
            return state
    }
}
