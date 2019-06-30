import React from 'react'
import { Dialog,DialogActions,DialogContent,DialogTitle, Button, Toolbar, withStyles}
from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import WeekPicker from '../Picker/WeekPicker'
import DuplicateSession from '../DuplicateSession/DuplicateSession'

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

const DateNavigator = ({classes, handleLastWeek, handleDuplicateTimetable,
    handleCurrentWeek, weekEndDate,weekStartDate, handleNextWeek,
    week, weekStr, open, setOpen, endSemDate, ...rest}) => {

    const {subjectInfo, course, batch, semester} = rest

    let dateStr = moment.utc().week(week).format('YYYY-MM-DD')
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

            <Button size="small"  color="primary" className="button" variant="outlined" onClick={handleNextWeek} disabled={new Date(dateStr) >= new Date(endSemDate)}>
                Next
                <KeyboardArrowRight fontSize={'inherit'}/>
            </Button>

            </span>
            <span className={classes.middle}>
                {
                    weekEndDate && weekStartDate ?
                    <b>{moment(weekStartDate, 'YYYY-MM-DD').format("ddd MM/DD")+ '~' + moment(weekEndDate, 'YYYY-MM-DD').format("ddd MM/DD")}</b> : null
                }
            </span>
            <span className={classes.right}>
            <DuplicateSession 
                sessionNames={Object.keys(subjectInfo).length !== 0 ? subjectInfo[course][batch][semester]['week'].map(e=>e.name) : []}
                handleDuplicateSession={handleDuplicateTimetable}/>
            </span>
        </Toolbar>
    );
}
export default withStyles(styles)(DateNavigator)