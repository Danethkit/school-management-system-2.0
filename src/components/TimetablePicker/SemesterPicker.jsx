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

function inputSemester(id,semester) {
    id += 1;
    return {id, semester};
}
const semesterData = [
    inputSemester(id,'Semester1'),
    inputSemester(id,'Semester2'),
    inputSemester(id,'Semester3'),
    inputSemester(id,'Semester4'),
    inputSemester(id,'Semester5'),
    inputSemester(id,'Semester6'),
    inputSemester(id,'Semester7'),
    inputSemester(id,'Semester8'),

];

class SemesterPicker extends Component {

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    state = {
        Semester: ''
    }

    render() {
        const {classes} =  this.props;
        return (

            <div>
                <TextField
                    select
                    fullWidth
                    autoFocus
                    className={classNames(classes.margin,)}
                    value={this.state.Semester}
                    onChange={this.handleChange('Semester')}
                    InputProps={{
                        startAdornment: <InputAdornment disableTypography={true} className={classes.textFile} position="start">Semester: </InputAdornment>,
                    }}
                >
                    {semesterData.map(option => (
                        <MenuItem key={option.id} value={option.semester}>
                            {option.semester}
                        </MenuItem>
                    ))}
                </TextField>
            </div>


        );
    }
}


export default withStyles (styles)(SemesterPicker)