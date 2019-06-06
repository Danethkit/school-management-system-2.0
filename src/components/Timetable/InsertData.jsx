import React,{memo} from "react";
import AutoComplete from '../Picker/AutoComplete'

function areEqual(prevProps, nextProps) {
  return nextProps.selectedFaculty ? false : true
}
const InsertData = ({onChange, row, col, value, facultyData, header, selectedFaculty}) => {
  return <AutoComplete
          value ={value}
          onChange ={e => onChange(row,col,e, header)}
          suggestions = {facultyData}
          selectedFaculty ={selectedFaculty}
        />
}
export default memo(InsertData, areEqual)
