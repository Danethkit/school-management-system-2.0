import React from "react"
import AutoComplete from './AutoComplete'
import {connect} from 'react-redux'

const WeekPicker = ({value, onChange,course,batch, semester, subjectInfo}) => {
  let suggestions = []
  if(Object.keys(subjectInfo).length !==0 && course !== null && batch !== null && semester !== null){
    suggestions = subjectInfo[course][batch][semester]['week'].map(e => e.name)
  }
  return <AutoComplete
          width={298.81}
          value ={value}
          onChange={onChange}
          label="Week"
          suggestions={suggestions}/>
}
export default connect(state=>({
  subjectInfo: state.initData.subjectInfo,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  semester : state.changePicker.semester,
}
  ))(WeekPicker)

