import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestGroup } from '../../redux/ActionCreator/apiRequest' 
import { onGroupChange } from '../../redux/ActionCreator/userBehavior' 
import DefaultPicker from './DefaultPicker'

const SemesterPicker = ({dispatch, group, groupData}) => {
  let actions = bindActionCreators({requestGroup, onGroupChange}, dispatch) 
  useEffect(()=> { actions.requestGroup()}, [])
  let names = []
  groupData.map(e => names.push(e.name))
  return <DefaultPicker 
          value ={group}
          handleOnChange ={actions.onGroupChange}
          label = "Group"
          menuItem = {{...names}}
        />
}
export default connect(state => ({
  group:state.changePicker.group,
  groupData: state.requestStudentData.groupData,
  batch : state.changePicker.batch
}))(SemesterPicker)