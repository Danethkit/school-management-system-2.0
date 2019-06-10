import React, {memo} from "react";
import AutoComplete from '../Picker/AutoComplete'

const InsertData = ({onChange, row, col, value, facultyData, header, selectedFaculty}) => {
  if(selectedFaculty !== undefined){
    let {course, batch, semester, group} = header
    try{
      value = selectedFaculty.res[course][batch][semester][group][col][row]
    }catch{value = null}
  }
  return <AutoComplete
          value ={value}
          onChange ={e => onChange(row,col,e, header)}
          suggestions = {facultyData}
          header={header}
          selectedFaculty={selectedFaculty}
          col ={col}
          row={row}
        />
}
const areEqual = (prevProps, nextProps) =>{
  let {row, col} = nextProps
  if(col !== undefined || row !== undefined){
    for(let course in nextProps.selectedFaculty.res){
      for(let batch in nextProps.selectedFaculty.res[course]){
        for(let semester in nextProps.selectedFaculty.res[course][batch]){
          for(let group in nextProps.selectedFaculty.res[course][batch][semester]){
            if(group in nextProps.selectedFaculty.res[course][batch][semester]){
              if(col in nextProps.selectedFaculty.res[course][batch][semester][group]){
                if(row in nextProps.selectedFaculty.res[course][batch][semester][group][col]){
                  if(prevProps.selectedFaculty.res !== undefined){
                    if(nextProps.selectedFaculty.res[course][batch][semester][group][col][row] === prevProps.selectedFaculty.res[course][batch][semester][group][col][row]){
                      return true
                    }
                  }
                  return false
                }
              }
            }
          }
        }
      }
    }
  }
  return true
}
export default memo(InsertData, areEqual)
