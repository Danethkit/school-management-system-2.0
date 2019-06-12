import React, {memo, useState} from "react";
import AutoComplete from '../Picker/AutoComplete'

const InsertData = ({onChange, row, col, facultyData, header, selectedFaculty}) => {
  const [value, setValue] = useState(null)
  let tempValue = null
  if(selectedFaculty && Object.keys(selectedFaculty).length !== 0){
    try{
      let {course, batch, semester, group} = header
      tempValue = selectedFaculty['res'][course][batch][semester][group][col][row]
      if(tempValue){
        setValue(tempValue)
      }
    }catch{}
  }
  const handleChange = value => {
    onChange(row, col, value, header)
    setValue(value)
  }
  return <AutoComplete
          onChange ={handleChange}
          suggestions = {facultyData}
          header={header}
          selectedFaculty={selectedFaculty}
          col ={col}
          row={row}
          value={value}
          // disabled={disabled}
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
                      console.log('true222222222222');
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
  console.log('true1============');
  return true
}
export default memo(InsertData, areEqual)
