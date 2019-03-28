import React from  'react'
import {Paper, Grid, FormControl, withStyles} from "@material-ui/core";
import CoursePicker from "./CouserPicker";
import BatchPicker from "./BatchPicker";
import GroupPicker from "./GroupPiker";
import SemesterPicker from "./SemesterPicker";
import WeekPicker from "./WeekPicker";
import ReactDOM from "react-dom";


const styles = theme => ({

    generateTimetable: {
        backgroundColor:"#efefef",
        paddingBottom:1,
        borderColor:"#ccc",
        borderStyle:"solid",
        borderRadius:3,
        borderWidth: 1,
        marginRight:3,
        marginLeft:3,
        marginBottom:5
    },

    headContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop:10,
        marginLeft: 10,
        marginRight:10,
        borderWidth:1,
    },

    label:{
        margin: theme.spacing.unit*2,
        flexGrow:1,
        fullWidth:1,
    }
});



class TimetableHeaderPicker extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.generateTimetable}>
                    <div className={classes.headContainer}>

                        <div className={classes.label}>
                            <CoursePicker/>
                        </div>
                        <div className={classes.label}>
                            <BatchPicker/>
                        </div>
                        <div className={classes.label}>
                            <GroupPicker/>
                        </div>
                        <div className={classes.label}>
                            <SemesterPicker/>
                        </div>
                        <div className={classes.label}>
                            <WeekPicker/>
                        </div>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}
export default withStyles(styles)(TimetableHeaderPicker)