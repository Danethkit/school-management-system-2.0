// handle user behavior 
import {
    CHANGE_BATCH,
    CHANGE_SESSION,
    CHANGE_REMARK,
    CHANGE_DATE,
    CHANGE_SEMESTER,
    CHANGE_COURSE,
    CHANGE_GROUP,
    CHANGE_FACULTY,
    CHANGE_SUBJECT,
    CHANGE_SEARCH_FIELD,
    TOGGLE_DIALOG

} from '../../constants/env'

export const onBatchChange = (data) => ({type:CHANGE_BATCH, payload:data})
export const onSubjectChange = (data) => ({type:CHANGE_SUBJECT, payload:data})   
export const onSessionChange = (data) => ({type:CHANGE_SESSION, payload:data})   
export const onDateChange = (data) => ({type:CHANGE_DATE, payload:data}) 
export const onRemarkChange = (data) => ({type:CHANGE_REMARK, payload:data}) 

export const onSemesterChange = (data) => ({type:CHANGE_SEMESTER, payload:data})   
export const onCourseChange = (data) => ({type:CHANGE_COURSE, payload:data})   
export const onFacultyChange = (data) => ({type:CHANGE_FACULTY, payload:data}) 
export const onGroupChange = (data) => ({type:CHANGE_GROUP, payload:data}) 
export const onSearchFieldChange = (data) => ({type:CHANGE_SEARCH_FIELD, payload:data})
export const toggleDialog = (data) => ({type:TOGGLE_DIALOG, payload:data})
