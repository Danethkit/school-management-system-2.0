import {
    CHANGE_SEMESTER,
    CHANGE_COURSE,
    CHANGE_GROUP,
    CHANGE_FACULTY,
    CHANGE_BATCH,
    CHANGE_SUBJECT,
    CHANGE_REMARK,
    CHANGE_SESSION,
    CHANGE_DATE,
    CHANGE_SEARCH_FIELD,
    TOGGLE_DIALOG,
    SET_SUBJECTS,
    CHANGE_REPORT_END_DATE,
    CHANGE_REPORT_START_DATE,
} from '../../constants/env'

const initialPicker = {
    batch : {label:'Batch 4', value:'Batch 4'},
    subject : {label:'Common [SE B 111]', value:'Common [SE B 111]'},
    session: {label:'09:10am-10:00am',value: '09:10am-10:00am'},
    date : new Date(),
    remark: {},
    group : {label:'Group 1', value:'Group 1'},
    faculty: {label:'',value:''},
    semester : {label:'Semester 1',value:'Semester 1'},
    course: {label:'Software Engineering', value:'Software Engineering'},
    searchField: '',
    createAttendanceRequested : false,
    subjects : [],
    endDate : new Date(),
    startDate : new Date(),
}

export const changePicker = (state=initialPicker, action={}) => {
    switch(action.type) {
        case CHANGE_BATCH:
            return Object.assign({}, state, {batch:action.payload})
        case CHANGE_SUBJECT:
            return Object.assign({}, state, {subject:action.payload})
        case CHANGE_SESSION:
            return Object.assign({}, state, {session:action.payload})
        case CHANGE_DATE:
            return Object.assign({}, state, {date:action.payload})
        case CHANGE_REMARK:
            return Object.assign({}, state, {remark:action.payload})
        case CHANGE_SEMESTER:
            return Object.assign({}, state, {semester:action.payload})
        case CHANGE_COURSE:
            return Object.assign({}, state, {course:action.payload})
        case CHANGE_FACULTY:
            return Object.assign({}, state, {faculty:action.payload})
        case CHANGE_GROUP:
            return Object.assign({}, state, {group:action.payload})
        case CHANGE_SEARCH_FIELD:
            return { ...state, ...{searchField:action.payload}}
        case TOGGLE_DIALOG:
            return { ...state, ...{createAttendanceRequested:action.payload}}
        case SET_SUBJECTS:
            return {...state, ...{subjects:action.payload}}
        case CHANGE_REPORT_END_DATE:
            return {...state, ...{endDate:action.payload}}
        case CHANGE_REPORT_START_DATE:
            return {...state,...{startDate:action.payload}}
        default:
            return state
    }
}