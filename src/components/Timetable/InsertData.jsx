import React,{memo} from "react";
import AutoComplete from '../Picker/AutoComplete'

function areEqual(prevProps, nextProps) {
  if(nextProps.facultyData.length !== prevProps.facultyData.length){
    return false
  }
  if(nextProps.col in nextProps.selectedFaculty){
    if(nextProps.row in nextProps.selectedFaculty[nextProps.col]){
      return false
    }
  }
  return true
}
const InsertData = ({onChange, row, col, value, facultyData, header, selectedFaculty}) => {
  return <AutoComplete
          value ={value}
          onChange ={e => onChange(row,col,e, header)}
          suggestions = {facultyData}
          selectedFaculty ={selectedFaculty}
          header={header}
          col ={col}
          row={row}
        />
}
export default memo(InsertData, areEqual)
