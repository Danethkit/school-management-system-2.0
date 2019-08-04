import React from 'react'
import {shallow} from 'enzyme'
import DateNavigator from './DateNavigator'
import DisplayTimetableHeader from './DisplayTimetableHeader'
import FacultyDateNavigator from './FacultyDateNavigator'
import TimeTable from './TimeTable'
describe('Timetable', () => {
    describe('DateNavigator', () => {
        let Date_Navigator
        beforeEach(()=>{
            Date_Navigator = shallow(<DateNavigator/>)
        })
        it('should render without errors', () => {
            expect(Date_Navigator).toMatchSnapshot()
        });
    });
    describe('DisplayTimetableHeader', () => {
        let DisplayTime_tableHeader
        beforeEach(()=>{
            DisplayTime_tableHeader = shallow(<DisplayTimetableHeader/>)
        })
        it('should render without errors', () => {
            expect(DisplayTime_tableHeader).toMatchSnapshot()
        });
    });
    describe('FacultyDateNavigator', () => {
        let FacultyDate_Navigator
        beforeEach(()=>{
            FacultyDate_Navigator = shallow(<FacultyDateNavigator/>)
        })
        it('should render without errors', () => {
            expect(FacultyDate_Navigator).toMatchSnapshot()
        });
    });
    describe('TimeTable', () => {
        let Time_Table
        beforeEach(()=>{
            Time_Table = shallow(<TimeTable/>)
        })
        it('should render without errors', () => {
            expect(Time_Table).toMatchSnapshot()
        });
    });
});
