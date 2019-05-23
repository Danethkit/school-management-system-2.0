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
} from '../../constants/env'

const initialPicker = {
    batch : 'Batch 4',
    subject : 'Common [SE B 111]',
    session: '09:10am-10:00am',
    date : new Date(),
    remark: {},
    group : '',
    faculty: '',
    semester : '',
    course: '',
    searchField: ''
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
        default:
            return state
    }
}