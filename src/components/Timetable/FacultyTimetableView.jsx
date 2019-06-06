import React from 'react'
import { Divider, InputBase,Grid, Paper, Table,Tooltip, TableBody, TableCell, TableHead, TableRow, withStyles, Button, Toolbar
} from "@material-ui/core";
import PropTypes from "prop-types";
import TimeTableSearchBox from "../TimetablePicker/TimeTableSearchBox";
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
        marginTop: theme.spacing(3) *3 ,
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
        margin: theme.spacing(3),
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
    gridContainer:{
        display:1,
        marginBottom:-5,
        marginTop:5
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
function inputData(dat,ses,time,sub,bat,gro,sem,cou,wee) {
    id += 1;
    return {id, dat,ses,time,sub,bat,gro,sem,cou,wee};
}

const headData = [
    inputData("Date", 'Session' ,'Time', 'Subject', 'Batch', 'Group', 'Semester', 'Course', 'Week')
];

// function to input value to table body
function createData(dat,ses,time,sub,bat,gro,sem,cou,wee) {
    id += 1;
    return {id, dat,ses,time,sub,bat,gro,sem,cou,wee};
}
const bodyData = [
    createData('Sun 05/19/19','1','8:00am - 8:50am','Software Engineering',4,1,3,'Software Engineering',20),
    createData('Sun 05/19/19','2','8:50am - 9:40am','Software Engineering',4,1,3,'Software Engineering',20),
    createData('Sun 05/19/19','3','9:40am - 10:30am','AI',3,1,5,'Software Engineering',20),
    createData('Mon 05/20/19','2','8:50am - 9:40am','Software Engineering',4,1,3,'Software Engineering',20),
    createData('Mon 05/20/19','4','10:45am - 11:35am','AI',3,1,5,'Software Engineering',20),
    createData('Mon 05/20/19','5','11:35am - 12:25pm','AI',3,1,5,'Software Engineering',20),
    createData('Tue 05/21/19','1','8:00am - 8:50am','Software Engineering',4,1,5,'Software Engineering',20),
    createData('Wed 05/22/19','1','8:00am - 8:50am','Software Engineering',4,1,3,'Software Engineering',20),
    createData('Wed 05/22/19','3','9:40am - 10:30am','AI',3,1,5,'Software Engineering',20),
    createData('Thu 05/23/19','2','8:50am - 9:40am','Software Engineering',4,1,3,'Software Engineering',20),
    createData('Thu 05/23/19','4','10:45am - 11:35am','AI',3,1,5,'Software Engineering',20),
    createData('Thu 05/23/19','5','11:35am - 12:25pm','AI',3,1,5,'Software Engineering',20),
    createData('Fri 05/24/19','1','8:00am - 8:50am','Software Engineering',4,1,5,'Software Engineering',20),

]

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
                <Grid container className={classes.gridContainer}>
                    <Grid item  className={classes.left} style={{marginLeft:23}}>
                        <b>Faculty: Shiraz Kaurana</b>

                    </Grid>
                    <Grid item style={{marginRight:23}}>
                       <b>Faculty Code: 110101212</b>

                    </Grid>
                </Grid>
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
                        {/*<DisplayTimetableHeader course={table.course} batch={table.batch}  semester={table.semester} week={table.week}/>*/}
                        <div className={classes.container}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        {headData.map(row => (
                                            <TableRow className={classes.row} key={row.id}>
                                                <CustomTableCell align='center' multiline={"true"} >{row.dat}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.ses}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.time}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.sub}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.bat}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.gro}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.sem}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.cou}</CustomTableCell>
                                                <CustomTableCell align='center' multiline={"true"} >{row.wee}</CustomTableCell>

                                            </TableRow>
                                        ))}
                                    </TableHead>
                                    <TableBody>
                                        {bodyData.map(row => (
                                            <TableRow className={classes.row} key={row.id}>
                                                <CustomTableCell align="center">
                                                    {row.dat}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.ses}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.time}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.sub}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.bat}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.gro}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.sem}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.cou}
                                                </CustomTableCell>
                                                <CustomTableCell align="center">
                                                    {row.wee}
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