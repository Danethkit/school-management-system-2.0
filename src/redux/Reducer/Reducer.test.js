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
    SET_SELECTED_FACULTY,
    PRINT_REPORT_LOADING
} from '../../constants/env'
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
import {changePicker} from './userBehaviorReducer'
import {initData} from './apiRequestReducer'


describe('Reducer', () => {
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
        userTT: {},
        facultyTT : {},
        studentTT: {},
        TTView:{},
        editTT: {},
        userProfile: {},
        editTTStatus: {},
        semDate: [],
        attendanceReportData: {}
    }
    const initialPicker = {
        batch : 'Batch 4',
        subject : 'Common',
        session: '',
        date : new Date(),
        remark: {},
        group :'Group 1',
        faculty: '',
        semester : 'Semester 1',
        course: 'Software Engineering',
        searchField: '',
        odooServerStatus : false,
        subjects : [],
        endDate : new Date(),
        startDate : new Date(),
        selectedFaculty : {},
        printReportLoading : false,
    }
    const date = new Date() 
    describe('userBehaviorReducer', () => {
        it('should return initPicker state', () => {
            const newState = changePicker(initialPicker,{})
            expect(newState).toEqual(initialPicker)
        });
        it('should handle CHANGE_BATCH', () => {
            expect(changePicker([],{
                type:CHANGE_BATCH,
                payload:"batch3"
            })).toEqual({batch:"batch3"})
        });
        it('should handle CHANGE_SUBJECT', () => {
            expect(changePicker([],{
                type:CHANGE_SUBJECT,
                payload:"IT"
            })).toEqual({subject:"IT"})
        });
        it('should handle CHANGE_SESSION', () => {
            expect(changePicker([],{
                type:CHANGE_SESSION,
                payload:"1"
            })).toEqual({session:"1"})
        });
        it('should handle CHANGE_DATE', () => {
            expect(changePicker([],{
                type:CHANGE_DATE,
                payload:date
            })).toEqual({date})
        });
        it('should handle CHANGE_REMARK', () => {
            expect(changePicker([],{
                type:CHANGE_REMARK,
                payload:{}
            })).toEqual({remark:{}})
        });
        it('should handle CHANGE_SEMESTER', () => {
            expect(changePicker([],{
                type:CHANGE_SEMESTER,
                payload:"semester 1"
            })).toEqual({semester:"semester 1"})
        });
        it('should handle CHANGE_COURSE', () => {
            expect(changePicker([],{
                type:CHANGE_COURSE,
                payload:"HM"
            })).toEqual({course:"HM"})
        });
        it('should handle CHANGE_FALCULTY', () => {
            expect(changePicker([],{
                type:CHANGE_FACULTY,
                payload:""
            })).toEqual({faculty:""})
        });
        it('should handle CHANGE_GROUP', () => {
            expect(changePicker([],{
                type:CHANGE_GROUP,
                payload:"1"
            })).toEqual({group:"1"})
        });
        it('should handle CHANGE_SEARCH_FIELD', () => {
            expect(changePicker([],{
                type:CHANGE_SEARCH_FIELD,
                payload:""
            })).toEqual({searchField:""})
        });
        it('should handle TOGGLE_DIALOG', () => {
            expect(changePicker([],{
                type:TOGGLE_DIALOG,
                payload:true
            })).toEqual({odooServerStatus:true})
        })
        it('should handle CHANGE_REPORT_END_DATE', () => {
            expect(changePicker([],{
                type:CHANGE_REPORT_END_DATE,
                payload:date
            })).toEqual({endDate:date})
        })
        it('should handle CHANGE_REPORT_START_DATE', () => {
            expect(changePicker([],{
                type:CHANGE_REPORT_START_DATE,
                payload:date
            })).toEqual({startDate:date})
        })
        it('should handle SET_SELECTED_FALCULTY', () => {
            expect(changePicker([],{
                type:SET_SELECTED_FACULTY,
                payload:{}
            })).toEqual({selectedFaculty:{}})
        })
        it('should handle PRINT_REPORT_LOADING', () => {
            expect(changePicker([],{
                type:PRINT_REPORT_LOADING,
                payload:true
            })).toEqual({printReportLoading:true})
        })
    });
    describe('apiRequestReducer', () => {
        it('should return initialData', () => {
            expect(initData(undefined,{})).toEqual(initialData)
        });
        it('should handle REQUEST_FAILED', () => {
            expect(initData(undefined,{
                type:REQUEST_FAILED,
                payload:"error 404"
            }).error).toEqual("error 404")
        });
        it('should handle REQUEST_STUDENT_SUCCESS', () => {
            expect(initData(undefined,{
                type:REQUEST_STUDENTS_SUCCESS,
                payload:{
                    name:"Neak Panhboth"
                }
            }).studentData).toEqual({name:"Neak Panhboth"})
        });
        it('should handle REQUEST_SUBJECT_SUCCESS', () => {
            expect(initData(undefined,{
                type:REQUEST_SUBJECT_SUCCESS,
                payload:"IT"
            }).subjectData).toEqual("IT")
        });
        it('should handle REQUEST_ATTENDANCE_LINE_SUCCESS', () => {
            expect(initData(undefined,{
                type:REQUEST_ATTENDANCE_LINE_SUCCESS,
                payload:{
                    line1:"",
                    line2:"",
                    line3:""
                }
            }).attendanceLine).toEqual({
                line1:"",
                line2:"",
                line3:""
            })
        });
        it('should handle REQUEST_ATTENDANCE_LINE_PENDING', () => {
            expect(initData(undefined,{
                type:REQUEST_ATTENDANCE_LINE_PENDING,
                payload:true
            }).requestAttendanceLinePending).toEqual(true)
        });
        it('should handle REQUEST_ATTENDANCE_LINE_FAILED', () => {
            expect(initData(undefined,{
                type:REQUEST_ATTENDANCE_LINE_FAILED,
                payload:true
            }).requestAttendanceLineFalied).toEqual(true)
        });
        it('should handle REQUEST_SUBJECT_DATA', () => {
            expect(initData(undefined,{
                type:REQUEST_SUBJECT_DATA,
                payload:{
                    info1:"",
                    info2:""
                }
            }).subjectInfo).toEqual({
                info1:"",
                info2:""
            })
        });
        it('should handle PRINT_ATTENDANCE_REPORT', () => {
            expect(initData(undefined,{
                type:PRINT_ATTENDANCE_REPORT,
                payload:""
            }).reportOpen).toEqual("")
        });
        it('should handle SET_REPORT_B64', () => {
            expect(initData(undefined,{
                type:SET_REPORT_B64,
                payload:""
            }).b64Report).toEqual("")
        });
        it('should handle GET_SESSION_DATA', () => {
            expect(initData(undefined,{
                type:GET_SESSION_DATA,
                payload:{
                    test1:"",
                    test2:""
                }
            }).sessionData).toEqual({
                test1:"",
                test2:""
            })
        });
        it('should handle SET_USER_IDENTITY', () => {
            expect(initData(undefined,{
                type:SET_USER_IDENTITY,
                payload:{
                    user1:"",
                    user2:""
                }
            }).userTT).toEqual({
                user1:"",
                user2:""
            })
        });
        it('should handle SET_FACULTY_TIMETABLE', () => {
            expect(initData(undefined,{
                type:SET_FACULTY_TIMETABLE,
                payload:{
                    test1:"",
                    test2:""
                }
            }).facultyTT).toEqual({
                test1:"",
                test2:""
            })
        });
        it('should handle SET_STUDENT_TIMETABLE', () => {
            expect(initData(undefined,{
                type:SET_STUDENT_TIMETABLE,
                payload:{
                    test1:"",
                    test2:""
                }
            }).studentTT).toEqual({
                test1:"",
                test2:""
            })
        });
        it('should handle SET_TIMETABLE_VIEW', () => {
            expect(initData(undefined,{
                type:SET_TIMETABLE_VIEW,
                payload:{
                    test1:"",
                    test2:""
                }
            }).TTView).toEqual({
                test1:"",
                test2:""
            })
        });
        it('should handle SET_EDIT_TT', () => {
            expect(initData(undefined,{
                type:SET_EDIT_TT,
                payload:{
                    test1:"",
                    test2:""
                }
            }).editTT).toEqual({
                test1:"",
                test2:""
            })
        });
        it('should handle SET_UID', () => {
            expect(initData(undefined,{
                type:SET_UID,
                payload:{
                    test1:"",
                    test2:""
                }
            }).userProfile).toEqual({
                test1:"",
                test2:""
            })
        });
        it('should handle SET_SEM_DATE', () => {
            expect(initData(undefined,{
                type:SET_SEM_DATE,
                payload:[1,2,3]
            }).semDate).toEqual([1,2,3])
        });
        it('should handle SET_ATTENDANCE_REPORT_DATA', () => {
            expect(initData(undefined,{
                type:SET_ATTENDANCE_REPORT_DATA,
                payload:{
                    test1:"",
                    test2:""
                }
            }).attendanceReportData).toEqual({
                test1:"",
                test2:""
            })
        });
    });
});

