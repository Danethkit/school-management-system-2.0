import React from 'react'
import {shallow} from 'enzyme'
import AttendanceButton from './AttendanceButton'
import DownloadButton from './DownloadButton';
import ToggleButton from './ToggleButton'

describe('Button components', () => {
    describe('AttendanceButton component', () => {
        let Attendance_Button
        beforeEach(()=>{
            Attendance_Button = shallow(<AttendanceButton/>)
        })
        it('should render a Grid component from material ui', () => {
            const render = Attendance_Button.find(`[data-test='Grid']`)
            expect(render.length).toBe(1)
        });
        it('should render a Button component from material ui', () => {
            const render = Attendance_Button.find(`[data-test='Button']`)
            expect(render.length).toBe(1)
        });
    });
    describe('DownloadButton', () => {
        let Download_Button
        beforeEach(()=>{
            const props = {
                classes:{
                    button:""
                }
            }
            Download_Button = shallow(<DownloadButton {...props}/>)
        })
        it('should render a Grid component from material ui',()=>{
            const render = Download_Button.find(`[data-test='Grid']`)
            expect(render.length).toBe(1)
        })
        it('should render a Button component from material ui', () => {
            const render = Download_Button.find(`[data-test='Button']`)
            expect(render.length).toBe(1)
        });
        it('should render a SavaIcon component from material ui', () => {
            const render = Download_Button.find(`[data-test='SaveIcon']`)
            expect(render.length).toBe(1)
        });
    });
    describe('Toggle Button', () => {
        let Toggle_Button
        beforeEach(()=>{
            Toggle_Button = shallow(<ToggleButton/>)
        })
        it('should render a Grid component from material UI', () => {
            const render = Toggle_Button.find(`[data-test='Grid']`)
            expect(render.length).toBe(1)
        });
        it('should render two Button components from material UI', () => {
            const render = Toggle_Button.find(`[data-test='Button']`)
            expect(render.length).toBe(2)
        });
        it('should render a TodayIcon from material UI', () => {
            const render = Toggle_Button.find(`[data-test='TodayIcon']`)
            expect(render.length).toBe(1)
        });
        it('should render a FormatAlignCenterIcon from material UI', () => {
            const render = Toggle_Button.find(`[data-test='FormatAlignCenterIcon']`)
            expect(render.length).toBe(1)
        });
    });
});