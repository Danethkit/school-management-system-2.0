import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { InputAdornment } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export default ({value, onChange , label}) =>{
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="MM/dd/yyyy"
          autoOk
          maxDate ={new Date()}
          inputVariant='outlined'
          autoFocus
          fullWidth
          variant="inline"
          value={value}
          onChange={onChange}
          style={{marginTop:16, marginBottom:4}}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                position="start"
                style={{fontSize:14,}}
              >
                <b>{label}:</b>
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>
    );
}


