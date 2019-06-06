import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestFaculty } from '../../redux/ActionCreator/apiRequest' 
import { onFacultyChange } from '../../redux/ActionCreator/userBehavior' 
import DefaultPicker from './DefaultPicker'

const FacultyPicker = ({dispatch, faculty, facultyData}) => {
  let actions = bindActionCreators({requestFaculty, onFacultyChange}, dispatch)
  useEffect(()=> { actions.requestFaculty()}, [])
  let names = []
  facultyData.map(e => names.push(e.name))
  return <DefaultPicker 
          value ={faculty}
          handleOnChange ={actions.onFacultyChange}
          label = "Faculty"
          menuItem = {{...names}}
        />
}
export default connect(state => ({
  faculty:state.changePicker.faculty,
  facultyData: state.initData.facultyData
}))(FacultyPicker)