import React from 'react'
import {shallow} from 'enzyme'
import TableColumn from './TableColumn'

describe('Table component', () => {
    const props={
        classes:{
            text:""
        },        
    }
    let Table_Column
    beforeEach(()=>{
        Table_Column = shallow(<TableColumn {...props}/>)
    })
    it('should render without errors', () => {
        const render = Table_Column.find(`[data-test='TableCell']`)
        expect(render.length).toBe(1)
    });
    it('should render a tooltip component', () => {
        const render = Table_Column.find(`[data-test='ToolTip']`)
        expect(render.length).toBe(1)
        
    });
    it('should render a TableSortLabel component', () => {
        const render = Table_Column.find(`[data-test='TableSortLabel']`)
        expect(render.length).toBe(1)
    });
    it('should have styles', () => {
        
    });
});