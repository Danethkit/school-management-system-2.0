import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {InputLabel, Input, MenuItem, FormControl, Select} from "@material-ui/core/";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  }
});



function DropBox ({classes, items, placeholder,handleChange, session}) {
    return (

        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">{placeholder}</InputLabel>
            <Select
                value={session}
                onChange={handleChange}
                input={<Input id="age-simple"/>}
            >
                {items.map((item,index)=>
                    <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
            </Select>
        </FormControl>)

}


DropBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropBox);
