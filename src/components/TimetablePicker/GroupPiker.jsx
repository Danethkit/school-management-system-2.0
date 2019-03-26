import React, { Component } from "react";
import { Grid, MenuItem, FormControl, Select ,TextField,InputAdornment,withStyles} from "@material-ui/core/";
import classNames from 'classnames'



const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    textFile: {
        fontSize: 14
    }

});

let id = 0;

function inputGroup(id,group) {
    id += 1;
    return {id, group};
}
const groupData = [
    inputGroup(id,'Group 1'),
    inputGroup(id,'Group 2'),
    inputGroup(id,'Group 2'),

];

class GroupPicker extends Component {

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    state = {
        Group: ''
    }

    render() {
        const {classes} =  this.props;
        return (

            <div>
                <TextField
                    fullWidth
                    select
                    autoFocus
                    className={classNames(classes.margin)}
                    value={this.state.Group}
                    onChange={this.handleChange('Group')}
                    InputProps={{
                        startAdornment: <InputAdornment disableTypography={true} className={classes.textFile}  position="start">Group: </InputAdornment>,
                    }}
                >
                    {groupData.map(option => (
                        <MenuItem key={option.id} value={option.group}>
                            {option.group}
                        </MenuItem>
                    ))}
                </TextField>
            </div>


        );
    }
}


export default withStyles (styles)(GroupPicker)