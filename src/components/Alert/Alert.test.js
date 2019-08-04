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
            expect(Default_Dialog).toMatchSnapshot()
        });
    });
    describe('OdooServerStatusDialog',()=>{
        let OdooServer_StatusDialog
        beforeEach(()=>{
            OdooServer_StatusDialog = shallow(<OdooServerStatusDialog/>)
        })
        it('it should render without erros', () => {
            expect(OdooServer_StatusDialog).toMatchSnapshot()
        });
    })
});