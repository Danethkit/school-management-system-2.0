import React from "react"
import AutoComplete from './AutoComplete'

const WeekPicker = ({value, onChange}) => {
  return <AutoComplete
          value ={value}
          onChange={onChange}
          label="Week"
          suggestions={['1','2']}/>
}
export default WeekPicker

