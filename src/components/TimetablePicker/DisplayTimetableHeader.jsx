import React from'react'
import {InputAdornment, TextField, withStyles} from '@material-ui/core';

const styles = theme => ({


    headContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        // margin: "10px 10px 0 0",
        borderWidth:1,
    },

    label:{
        margin: theme.spacing.unit*2,
        flexGrow:1,
        fullWidth:1,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textFile: {
        fontSize: 14
    }
});

function DisplayTimetableHeader(props)
{
    const {classes,} = props;
    return(
        <>

            <div className={classes.headContainer}>

                <TextField
                    autoFocus
                    text-align-last= "center"
                    className={classes.label}
                    value={props.course}
                    InputProps={{
                        startAdornment: <InputAdornment  disableTypography={true} className={classes.textFile} position="start">Course: </InputAdornment>,
                    }}
                />
                <TextField
                    text-align-last= "center"
                    autoFocus
                    className={classes.label}
                    value={props.batch}
                    InputProps={{
                        startAdornment: <InputAdornment  disableTypography={true} className={classes.textFile} position="start">Batch: </InputAdornment>,
                    }}
                />
                <TextField
                    autoFocus
                    className={classes.label}
                    value={props.group}
                    InputProps={{
                        startAdornment: <InputAdornment  disableTypography={true} className={classes.textFile} position="start">Group: </InputAdornment>,
                    }}
                />
                <TextField
                    autoFocus
                    text-align-last= "center"
                    className={classes.label}
                    value={props.semester}
                    InputProps={{
                        startAdornment: <InputAdornment   disableTypography={true} className={classes.textFile} position="start">Semester: </InputAdornment>,
                    }}
                />
                <TextField

                    autoFocus
                    className={classes.label}
                    value={props.week}
                    InputProps={{
                        startAdornment: <InputAdornment  disableTypography={true} className={classes.textFile} position="start">Week: </InputAdornment>,
                    }}
                />



            </div>

        </>
    )
}

export default withStyles (styles)(DisplayTimetableHeader)
