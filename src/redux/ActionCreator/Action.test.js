import * as userBehavior from './userBehavior'
import * as actions from '../../constants/env'
import * as apiRequest from './apiRequest'
import fetchMock from 'fetch-mock'


describe('Actions', () => {
    describe('userBehavior', () => {
        it('should create onBatchChange action', () => {
            const data = "batch 3"
            const expectedAction = {
                type: actions.CHANGE_BATCH,
                payload:data
            }
            expect(userBehavior.onBatchChange(data)).toEqual(expectedAction)
        });
        it('should create onSubjectChange action', () => {
            const data = "Speech"
            const expectedAction = {
                type: actions.CHANGE_SUBJECT,
                payload:data
            }
            expect(userBehavior.onSubjectChange(data)).toEqual(expectedAction)
        });
        it('should create onSessionChange action', () => {
            const data = "2"
            const expectedAction = {
                type: actions.CHANGE_SESSION,
                payload:data
            }
            expect(userBehavior.onSessionChange(data)).toEqual(expectedAction)
        });
        it('should create onDateChange action', () => {
            const data = new Date()
            const expectedAction = {
                type: actions.CHANGE_DATE,
                payload:data
            }
            expect(userBehavior.onDateChange(data)).toEqual(expectedAction)
        });
        it('should create onRemarkChange action', () => {
            const data = ""
            const expectedAction = {
                type: actions.CHANGE_REMARK,
                payload:data
            }
            expect(userBehavior.onRemarkChange(data)).toEqual(expectedAction)
        });
        it('should create onSemesterChange action', () => {
            const data = "2"
            const expectedAction = {
                type: actions.CHANGE_SEMESTER,
                payload:data
            }
            expect(userBehavior.onSemesterChange(data)).toEqual(expectedAction)
        });
        it('should create onCourseChange action', () => {
            const data = ""
            const expectedAction = {
                type: actions.CHANGE_COURSE,
                payload:data
            }
            expect(userBehavior.onCourseChange(data)).toEqual(expectedAction)
        });
        it('should create onFacultyChange action', () => {
            const data = ""
            const expectedAction = {
                type: actions.CHANGE_FACULTY,
                payload:data
            }
            expect(userBehavior.onFacultyChange(data)).toEqual(expectedAction)
        });
        it('should create onGroupChange action', () => {
            const data = "2"
            const expectedAction = {
                type: actions.CHANGE_GROUP,
                payload:data
            }
            expect(userBehavior.onGroupChange(data)).toEqual(expectedAction)
        });
        it('should create onSearchFieldChange action', () => {
            const data = ""
            const expectedAction = {
                type: actions.CHANGE_SEARCH_FIELD,
                payload:data
            }
            expect(userBehavior.onSearchFieldChange(data)).toEqual(expectedAction)
        });
        it('should create toggleDialog action', () => {
            const data = true
            const expectedAction = {
                type: actions.TOGGLE_DIALOG,
                payload:data
            }
            expect(userBehavior.toggleDialog(data)).toEqual(expectedAction)
        });
        it('should create setSubjects action', () => {
            const data = "Speech"
            const expectedAction = {
                type: actions.SET_SUBJECTS,
                payload:data
            }
            expect(userBehavior.setSubjects(data)).toEqual(expectedAction)
        });
        it('should create ChangeReportEndDate action', () => {
            const data = new Date()
            const expectedAction = {
                type: actions.CHANGE_REPORT_END_DATE,
                payload:data
            }
            expect(userBehavior.changeReportEndDate(data)).toEqual(expectedAction)
        });
        it('should create ChangeReportStartDate action', () => {
            const data = new Date()
            const expectedAction = {
                type: actions.CHANGE_REPORT_START_DATE,
                payload:data
            }
            expect(userBehavior.changeReportStartDate(data)).toEqual(expectedAction)
        });
        it('should create setSelectedFaculty action', () => {
            const data = true
            const expectedAction = {
                type: actions.SET_SELECTED_FACULTY,
                payload:data
            }
            expect(userBehavior.setSelectedFaculty(data)).toEqual(expectedAction)
        });
        it('should create setReportLoading action', () => {
            const data = true
            const expectedAction = {
                type: actions.PRINT_REPORT_LOADING,
                payload:data
            }
            expect(userBehavior.setReportLoading(data)).toEqual(expectedAction)
        });

    });
});