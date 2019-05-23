import React from 'react'
import { Divider, InputBase, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles, Button, Toolbar
} from "@material-ui/core";
import PropTypes from "prop-types";
import TimetableHeaderPicker from "../TimetablePicker/TimetableHeaderPicker";
import DisplayTimetableHeader from "../TimetablePicker/DisplayTimetableHeader";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 14,
        paddingRight:5,
        paddingLeft:5
    },
    body: {
        fontSize: 14,
        paddingRight:5,
        paddingLeft:5

    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit *3 ,
        overflow: 'auto',
    },
    table: {
        minWidth: 540,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#ddd',
            fontSize: 14,
            paddingRight:5,
            paddingLeft:5

        },
    },
    generateTimetable:{
        backgroundColor:"#efefef",
        paddingBottom:1,
        borderColor:"#ccc",
        borderStyle:"solid",
        borderRadius:3,
        borderWidth: 1,
        marginRight:3,
        marginLeft:3,
        marginBottom:15
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: -15,
        marginBottom:10,
        marginLeft: 15,
        marginRight:15,
    },
    formControl: {
        margin: theme.spacing.unit,
        flexGrow:1,
        fullWidth:1,
        textColor:'secondary',
        height:40,
        backgroundColor:"#fff"

    },
    inputLabel:{
        fontSize: 14,
        lineHeight:0,
        margin:0

    },
    outLinedInput:{
        color: 'primary'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        marginLeft:20,

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
    submitButton: {
        display:"flex",
        justifyContent:"flex-end",
        padding: " 10px 0 15px 0",
    },
    threeButton: {
        display : '1'
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
let id = 0;

function returnDate(i)
{
    return moment.utc().week(weekOfYear).weekday(i).format("ddd MM/DD")
}

// function to input value to table header
function inputData(ses,sun,mon,tue,wed,thu,fri,sat) {
    id += 1;
    return {id, ses,sun,mon,tue,wed,thu,fri,sat};
}
const headData = [
    inputData("Session",returnDate(0),returnDate(1),returnDate(2),returnDate(3),returnDate(4),returnDate(5),returnDate(6))
];

// function to input value to table body
function createData(ses,sun,mon,tue,wed,thu,fri,sat) {
    id += 1;
    return {id, ses,sun,mon,tue,wed,thu,fri,sat};
}
const bodyData = [
    createData(
        "8:00am - 8:50am",
        "",
        "",
        "Software Engineering",
        "Software Engineering",
        "Software Engineering",
        "Software Engineering",
        "Software Engineering"
    ),
    createData(
        "8:51am - 9:40am",
        "",
        "",
        "Data Structure",
        "Data Structure",
        "Data Structure",
        "Data Structure",
        "Data Structure"
    ),
    createData(
        "9:41am - 10:30am",
        "",
        "",
        "Leadership & Communication",
        "Leadership & Communication",
        "Leadership & Communication",
        "Leadership & Communication",
        "Leadership & Communication"
    ),
    createData(
        "10:46am - 11:35am",
        "",
        "",
        "Leadership & Communication",
        "Leadership & Communication",
        "Leadership & Communication",
        "Leadership & Communication",
        "Leadership & Communication"
    ),
    createData(
        "10:36am - 12:25am",
        "",
        "",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        "Internship"
    ),
    createData(
        "1:25pm - 2:15pm",
        "",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        ""
    ),
    createData(
        "2:16pm - 3:05pm",
        "",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        ""
    ),
    createData(
        "3:21m - 04:10pm",
        "",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        ""
    ),
    createData(
        "4:10pm - 5:00pm",
        "",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        "Internship",
        ""
    )
];

function createTable(course, batch, group,semester, week) {
    id += 1;
    return {
        id, course, batch, group, semester, week
    }
}
const numberTable = [
    createTable("Software EE", 2,1,7,),

];




class StudentView extends React.Component{

    state = {
        week: weekOfYear
    }


    handleLastWeek = () => {
        this.setState(state =>({
            week: state.week-1
        }));
    };
    handleCurrentWeek = () => {
        this.setState({week: weekOfYear});
    }
    handleNextWeek = () => {
        this.setState(state =>({
            week: state.week+1
        }));
    };

    render(){
        const {classes} = this.props;

        return(
            <React.Fragment>
                <Toolbar className={classes.threeButton}>
                <span className={classes.left}>
                <Button size="small" color="primary" className="button" variant="outlined" onClick={this.handleLastWeek} disabled={this.state.week === weekOfYear} >
                    <KeyboardArrowLeft fontSize={'inherit'} />
                    Last
                </Button>

                <Button size="small" color="primary" className="button" variant="outlined" onClick={this.handleCurrentWeek} disabled={this.state.week === weekOfYear} >
                    Current
                </Button>

                <Button size="small"  color="primary" className="button" variant="outlined" onClick={this.handleNextWeek} >
                    Next
                    <KeyboardArrowRight fontSize={'inherit'}/>
                </Button>

                </span>
                    <span className={classes.middle}>
                    <b>Week{moment.utc().week(this.state.week).format('w') -17}( {moment.utc().week(this.state.week).weekday(0).format("MMM/DD")} - {moment.utc().week(this.state.week).weekday(6).format("MMM/DD")})</b>
                </span>
                    <span className={classes.right}>


                <Button size="small" color="primary" className="button" variant="outlined" >
                        Month
                </Button>

                <Button size="small" color="primary" className="button" variant="outlined" >
                        Week
                </Button>

                <Button size="small"  color="primary" className="button" variant="outlined">
                        Day
                </Button>

                <Button size="small"  color="primary" className="button" variant="outlined">
                        Event
                </Button>
                </span>

                </Toolbar>


                {numberTable.map(table => (
                    <div className={classes.generateTimetable} >
                        <DisplayTimetableHeader course={table.course} batch={table.batch} group={table.group} semester={table.semester} week={table.week}/>
                        <div className={classes.container}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        {headData.map(row => (
                                            <TableRow className={classes.row} key={row.id}>
                                                <CustomTableCell align='center' multiline={"true"} >{row.ses}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"}>{moment.utc().week(this.state.week).weekday(0).format("ddd MM/DD")}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"}>{moment.utc().week(this.state.week).weekday(1).format("ddd MM/DD")}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"}>{moment.utc().week(this.state.week).weekday(2).format("ddd MM/DD")}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"}>{moment.utc().week(this.state.week).weekday(3).format("ddd MM/DD")}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"}>{moment.utc().week(this.state.week).weekday(4).format("ddd MM/DD")}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"}>{moment.utc().week(this.state.week).weekday(5).format("ddd MM/DD")}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"}>{moment.utc().week(this.state.week).weekday(6).format("ddd MM/DD")}</CustomTableCell>

                                            </TableRow>
                                        ))}
                                    </TableHead>
                                    <TableBody>
                                        {bodyData.map(row => (
                                            <TableRow className={classes.row} key={row.id}>
                                                <CustomTableCell align="center">
                                                    {row.ses}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.sun}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.mon}
                                                </CustomTableCell>
                                                <CustomTableCell align="center"
                                                >
                                                    {row.tue}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.wed}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.thu}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.fri}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.sat}
                                                </CustomTableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>


                    </div>

                    ))}
            </React.Fragment>
        )
    }
}
StudentView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentView)