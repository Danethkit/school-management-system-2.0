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

function inputBatch(id,batch) {
    id += 1;
    return {id, batch};
}
const batchData = [
    inputBatch(id,'Batch 2'),
    inputBatch(id,'Batch 3'),
    inputBatch(id,'Batch 4'),
    inputBatch(id,'Batch 5'),
    inputBatch(id,'Batch 6'),

];

class BatchPicker extends Component {

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    state = {
        Batch: ''
    }

    render() {
        const {classes} =  this.props;
        return (

            <div>
                <TextField
                    select
                    fullWidth
                    autoFocus
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.Batch}
                    onChange={this.handleChange('Batch')}
                    InputProps={{
                        startAdornment: <InputAdornment  disableTypography={true} className={classes.textFile} position="start">Batch: </InputAdornment>,
                    }}
                >
                    {batchData.map(option => (
                        <MenuItem key={option.id} value={option.batch}>
                            {option.batch}
                        </MenuItem>
                    ))}
                </TextField>
            </div>


        );
    }
}


export default withStyles (styles)(BatchPicker)