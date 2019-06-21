import React, {memo} from "react";
import AutoComplete from '../Picker/AutoComplete'

const InsertData = ({onChange, row, col, facultyData, header, selectedFaculty, weekStr}) => {


  let temp = null
  if(selectedFaculty && Object.keys(selectedFaculty).length !== 0){
    try{
      weekStr = weekStr.slice(0,4)
      let {course, batch, semester, group} = header
      temp = selectedFaculty['res'][weekStr][course][batch][semester][group][col][row]
      // console.log('temp',temp);
    }catch(err){}
  }
  // useEffect(()=> {
  //   if(temp !== undefined)  setValue(temp)
  // }, [selectedFaculty, weekStr])

  const handleChange = value => {
    onChange(row, col, value, header)
  }
  return <AutoComplete
          onChange ={handleChange}
          suggestions = {facultyData}
          header={header}
          selectedFaculty={selectedFaculty}
          col ={col}
          row={row}
          value={temp}
          weekStr={weekStr}
          // disabled={disabled}
        />
}
const areEqual = (prevProps, nextProps) =>{

  if(nextProps.weekStr !== prevProps.weekStr){
    return false
  }

  let {row, col, weekStr} = nextProps
  if(Object.keys(nextProps.selectedFaculty).length !== 0){
    for(let course in nextProps.selectedFaculty.res[weekStr]){
      for(let batch in nextProps.selectedFaculty.res[weekStr][course]){
        for(let semester in nextProps.selectedFaculty.res[weekStr][course][batch]){
          for(let group in nextProps.selectedFaculty.res[weekStr][course][batch][semester]){
            if(col in nextProps.selectedFaculty.res[weekStr][course][batch][semester][group]){
              if(row in nextProps.selectedFaculty.res[weekStr][course][batch][semester][group][col]){
                return false
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
