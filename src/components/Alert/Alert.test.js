import React from 'react'
import {shallow} from 'enzyme'
import DefaultDialog from './DefaultDialog'  
import OdooServerStatusDialog from './OdooServerStatusDialog'
describe('Alert components', () => {
    describe('DefaultDialog', () => {
        let Default_Dialog
        beforeEach(()=>{
            Default_Dialog = shallow(<DefaultDialog/>)
        })
        it('should render without errors', () => { 
            const render = Default_Dialog.find(`[data-test='Dialog']`)
            //expect(render.length).toBe(1)
        });
    });
    describe('OdooServerStatusDialog',()=>{
        let OdooServer_StatusDialog
        beforeEach(()=>{
            OdooServer_StatusDialog = shallow(<OdooServerStatusDialog/>)
        })
        it('it should render without erros', () => {
            const render = OdooServer_StatusDialog.find(`[data-test='DefaultAlert']`)
            //expect(render.length).toBe(1)
        });
    })
});