import React from 'react'
import {shallow} from 'enzyme'
import FacultyTimeTableView from './FacultyTimetableView'

describe('FacultyTimeTableView', () => {
    let FacultyTime_TableView
    beforeEach(()=>{
        FacultyTime_TableView = shallow(<FacultyTimeTableView/>)
    })
    it('should render without errors', () => {
        expect(FacultyTime_TableView).toMatchSnapshot()
    });
});