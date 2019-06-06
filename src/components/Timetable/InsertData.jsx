import React from "react";
import AutoComplete from '../Picker/AutoComplete'


export default ({onChange, row, col, value, facultyData, header}) => {
  return <AutoComplete
          value ={value}
          onChange ={e => onChange(row,col,e, header)}
          suggestions = {facultyData}
        />
}
