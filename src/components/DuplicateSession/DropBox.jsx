import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core/";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  }
});

const DropBox = ({classes, items, placeholder, session, handleChange}) => {
    return (
        <FormControl className={classes.formControl}>
          <InputLabel>{placeholder}</InputLabel>
          <Select
            value={session}
            onChange={event => handleChange(event.target.value)}
            input={<Input id="session-simple"/>}>
            {
                items.map(e=><MenuItem value={e} key={e}>{e}</MenuItem>)
            }
          </Select>
        </FormControl>
    )
}
DropBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropBox);
