import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestFaculty } from '../../redux/ActionCreator/apiRequest' 
import { onFacultyChange } from '../../redux/ActionCreator/userBehavior' 
import AutoComplete from './AutoComplete'


const FacultyPicker = ({dispatch, faculty, facultyData}) => {
  let actions = bindActionCreators({requestFaculty, onFacultyChange}, dispatch)
  useEffect(()=> { actions.requestFaculty()}, [])
  let names = []
  facultyData.map(e => names.push(e.name))
  return <AutoComplete
          width={280}
          value ={faculty}
          onChange ={actions.onFacultyChange}
          label = "Faculty"
          suggestions = {names}
        />
}
export default connect(state => ({
  faculty:state.changePicker.faculty,
  facultyData: state.initData.facultyData
}))(FacultyPicker)