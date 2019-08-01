import React from 'react'
import {shallow} from 'enzyme'
import AutoComplete from './AutoComplete'
import DefaultPicker from './DefaultPicker'
import BatchPicker from './BatchPicker'
import CoursePicker from './CoursePicker'
import DatePicker from './DatePicker'
import DefaultDatePicker from './DefaultDatePicker'
import EndDatePicker from './EndDatePicker'
import FacultyPicker from './FacultyPicker'
import GroupPicker from './GroupPicker'
import SemesterPicker from './SemesterPicker'
import SessionPicker from './SessionPicker'
import StartDatePicker from './StartDatePicker'
import SubjectPicker from './SubjectPicker'
import WeekPicker from './WeekPicker'
describe('Pickers', () => {
    describe('AutoComplete', () => {
        let Auto_Complete
        beforeEach(()=>{
            Auto_Complete = shallow(<AutoComplete/>)
        })
        it('should render without errors', () => {
            expect(Auto_Complete.find('Downshift').length).toBe(1)
        });
    });
    describe('DefaultPicker', () => {
        let Default_Picker
        beforeEach(()=>{
            Default_Picker = shallow(<DefaultPicker/>)
        })
        it('should render without errors', () => {
            //expect(Default_Picker.dive().find('TextField').length).toBe(1)
            expect(Default_Picker).toMatchSnapshot()
        });
    });
    describe('BatchPicker', () => {
        let Batch_Picker
        beforeEach(()=>{
            Batch_Picker = shallow(<BatchPicker/>)
        })
        it('should render without erros', () => {
            expect(Batch_Picker).toMatchSnapshot()
           
        });
    });
    describe('course picker', () => {
       let Course_Picker
        beforeEach(()=>{
            Course_Picker = shallow(<CoursePicker/>)
        })
        it('should render without errors', () => {
            expect(Course_Picker).toMatchSnapshot()
        });
    });
    describe('DatePicker', () => {
        let Date_Picker
        beforeEach(()=>{
            Date_Picker = shallow(<DatePicker/>)
        })
        it('should render without errors', () => {
            expect(Date_Picker).toMatchSnapshot()
        });
    });
    describe('DefaultDatePicker', () => {
        let Default_DatePicker
        beforeEach(()=>{
            Default_DatePicker = shallow(<DefaultDatePicker/>)
        })
        it('should render without errors', () => {
            expect(Default_DatePicker.find('MuiPickersUtilsProvider').length).toBe(1)
            
        });
    });
    describe('EndDatePicker', () => {
        let EndDate_Picker
        beforeEach(()=>{
            EndDate_Picker = shallow(<EndDatePicker/>)
        })
        it('should render without errors', () => {
            expect(EndDate_Picker).toMatchSnapshot()
        });
    });
    describe('FacultyPicker', () => {
        let Faculty_Picker
        beforeEach(()=>{
            Faculty_Picker = shallow(<FacultyPicker/>)
        })
        it('should render without errors', () => {
            expect(Faculty_Picker).toMatchSnapshot()
        });
    });
    describe('GroupPicker', () => {
        let Group_Picker
        beforeEach(()=>{
         Group_Picker = shallow(<GroupPicker/>)
        })
        it('should render without errors', () => {
            expect(Group_Picker).toMatchSnapshot()
        });
    });
    describe('SemesterPicker', () => {
        let Semester_Picker
        beforeEach(()=>{
            Semester_Picker = shallow(<SemesterPicker/>)
        })
        it('should render without errors', () => {
            expect(Semester_Picker).toMatchSnapshot()
        });
    });
    describe('StartDatePicker', () => {
        let StartDate_Picker
        beforeEach(()=>{
            StartDate_Picker = shallow(<StartDatePicker/>)
        })
        it('should render without errors', () => {
            expect(StartDate_Picker).toMatchSnapshot()
        });
    });
    describe('SubjectPicker', () => {
        let Subject_Picker
        beforeEach(()=>{
            Subject_Picker = shallow(<SubjectPicker/>)
        })
        it('should render without errors', () => {
            expect(Subject_Picker).toMatchSnapshot()
        });
    });
    describe('WeekPicker', () => {
        let Week_Picker
        beforeEach(()=>{
            Week_Picker = shallow(<WeekPicker/>)
        })
        it('should render without errors', () => {
            expect(Week_Picker).toMatchSnapshot()
        });
    });
});