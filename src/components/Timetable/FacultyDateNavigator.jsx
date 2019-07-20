import React from 'react'
import {Button, Toolbar, withStyles}
from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import moment from 'moment'

const styles = theme => ({

    container1: {
        display: "flex",
        flexWrap: "wrap"
    },

    piker:{
        margin:15,
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

const FacultyDateNavigator = ({classes, week, weekOfYear, handleLastWeek, handleCurrentWeek, handleNextWeek}) => {

    return (
        <Toolbar>
            <span className={classes.left}>
            <Button size="small" color="primary" className="button" variant="outlined" onClick={handleLastWeek} >
                <KeyboardArrowLeft fontSize={'inherit'} />
                Last
            </Button>

            <Button size="small" color="primary" className="button" variant="outlined" onClick={handleCurrentWeek} disabled={week === weekOfYear} >
                Current
            </Button>

            <Button size="small"  color="primary" className="button" variant="outlined" onClick={handleNextWeek} disabled={week === weekOfYear}>
                Next
                <KeyboardArrowRight fontSize={'inherit'}/>
            </Button>

            </span>
            <span className={classes.middle}>
                {
                    <b>{moment.utc().week(week).weekday(1).format("ddd MM/DD")+ '~' + moment.utc().week(week).weekday(6).format("ddd MM/DD")}</b>
                }
            </span>
        </Toolbar>
    );
}
export default withStyles(styles)(FacultyDateNavigator)