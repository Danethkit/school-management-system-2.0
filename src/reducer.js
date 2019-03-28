import {
    REQUEST_STUDENTS_PENDING,
    REQUEST_STUDENTS_SUCCESS,
    REQUEST_STUDENTS_FAILED,
    CHANGE_BATCH
} from './constants/env'

const initialStudentData = {
    studentData : [],
    isPending: false,
    error: '',
}

const initialPicker = {
    batch : 'Batch 4',
}

export const requestStudentData = (state=initialStudentData, action={}) => {
    switch(action.type){
        case REQUEST_STUDENTS_PENDING:
            return Object.assign({}, state, {isPending: true})
        case REQUEST_STUDENTS_SUCCESS:
            return Object.assign({}, state, {studentData: action.payload, isPending:false})
        case REQUEST_STUDENTS_FAILED:
            return Object.assign({}, state, {error: action.payload})
        default:
            return state
    }
}

export const changeBatch = (state=initialPicker, action={}) => {
    switch(action.type) {
        case CHANGE_BATCH:
            return Object.assign({}, state, {batch:action.payload})
        default:
            return state
    }
}