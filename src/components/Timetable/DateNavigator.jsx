import React from 'react'
import { Dialog,DialogActions,DialogContent,DialogTitle, Button, Toolbar, withStyles}
from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import WeekPicker from '../Picker/WeekPicker'
const styles = theme => ({

    container1: {
        display: "flex",
        flexWrap: "wrap"
    },
    piker:{
        margin:15,
        // margin: theme.spacing(3)*2,
    },

    margin: {
        width:'100%',
        margin:0,
        textRendering: 'auto',
        letterSpacing: 'normal',
        textAlign:'center',
        fontSize:14,
        wordSpacing: 'normal',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',

    },
    left: {
        flexGrow:1
    },
    right: {

    },
    middle: {
        flexGrow:1
    }

})
var moment = require("moment");
const weekOfYear = moment.utc().week();

const DateNavigator = ({classes, handleLastWeek, handleCurrentWeek, handleNextWeek, week, open,setOpen}) => {
    return (
        <Toolbar>
            <span className={classes.left}>
            <Button size="small" color="primary" className="button" variant="outlined" onClick={handleLastWeek} disabled={week === weekOfYear} >
                <KeyboardArrowLeft fontSize={'inherit'} />
                Last
            </Button>

            <Button size="small" color="primary" className="button" variant="outlined" onClick={handleCurrentWeek} disabled={week === weekOfYear} >
                Current
            </Button>

            <Button size="small"  color="primary" className="button" variant="outlined" onClick={handleNextWeek} >
                Next
                <KeyboardArrowRight fontSize={'inherit'}/>
            </Button>

            </span>
            <span className={classes.middle}>
                <b>Week{moment.utc().week(week).format('w') -17}( {moment.utc().week(week).weekday(0).format("MMM/DD")} - {moment.utc().week(week).weekday(6).format("MMM/DD")})</b>
            </span>
            <span className={classes.right}>


            <Button size="small" color="primary" className="button" variant="contained" onClick={()=>setOpen(true)} >
                    Duplicate
            </Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={open}
                    aria-labelledby='Dialog-content'
                            >
                    <DialogTitle>Duplicate Timetable</DialogTitle>
                    <DialogContent id ='Dialog-content'>
                    <form className={classes.container1}>
                        <WeekPicker name ='Duplicate_from' className={classes.piker}/>
                        <WeekPicker name ='Duplicate_to' className={classes.piker}/>
                    </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        Ok
                    </Button>
                    </DialogActions>
                </Dialog>
            </span>
        </Toolbar>
    );
}
export default withStyles(styles)(DateNavigator)