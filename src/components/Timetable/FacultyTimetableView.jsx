import React, {useState, useEffect} from 'react'
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import FacultyDateNavigator from "./FacultyDateNavigator";
import moment from 'moment'
import { requestFacultyTimeTable } from '../../redux/ActionCreator/apiRequest'
import {connect} from 'react-redux'



const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: "#fff",
        fontSize: 14
    },
      body: {
        fontSize: 14,
        paddingRight: 5,
        paddingLeft: 5,
        textAlign: "center",
        margin: 0
    }
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
            backgroundColor: '#CFD8DC',
            fontSize: 14,
            paddingRight:5,
            paddingLeft:5

        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: -15,
        marginBottom:10,
        marginLeft: 15,
        marginRight:15,
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
const headData = ["Date", 'Session' ,'Time', 'Subject', 'Batch', 'Group', 'Semester', 'Course', 'Week'];

const weekOfYear = moment.utc().week();

const FacultyTimeTableView = ({classes, userIden, facultyTT, dispatch, subjectInfo}) =>{

    const [week, setWeek] = useState(weekOfYear)

    const handleLastWeek= () => {
        setWeek(week -1)
    }

    const handleCurrentWeek = () => {
        setWeek(weekOfYear)
    }

    const handleNextWeek = () => {
        setWeek(week +1)
    }

    useEffect(()=>{
        dispatch(requestFacultyTimeTable({date:moment('2017-11-05', 'YYYY-MM-DD').format('YYYY-MM-DD')}))
    }, [week])


    return(
        <>
            <Grid container className={classes.gridContainer}>
                <Grid item  className={classes.left} style={{marginLeft:23}}>
                    <b>Faculty: {userIden['user']}</b>

                </Grid>
                <Grid item style={{marginRight:23}}>
                    <b>Faculty Code: 110101212</b>

                </Grid>
            </Grid>
            <FacultyDateNavigator
                week={week}
                handleLastWeek={handleLastWeek}
                handleNextWeek={handleNextWeek}
                handleCurrentWeek={handleCurrentWeek}
                weekOfYear = {weekOfYear}
                />
                <div className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className={classes.row} >
                                {
                                    headData.map(item =><CustomTableCell align='center' multiline={"true"} key={item}>{item}</CustomTableCell> )
                                }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(facultyTT).map(key=> {
                                        let flag = true
                                        return facultyTT[key].map((item,i) => {
                                        const row =  <TableRow className={classes.row} key={i}>
                                                {
                                                    flag ?
                                                    <CustomTableCell align='center' rowSpan={facultyTT[key].length} style={{border:'0.5px solid gray', backgroundColor:'#CFD8DC'}} >
                                                        {moment.utc().week(week).weekday(key).format('ddd YYYY/MM/DD')}
                                                    </CustomTableCell>: null
                                                }
                                                <CustomTableCell align='center'>
                                                    {Object.keys(subjectInfo).length !== 0 ? subjectInfo[item.course][item.batch][item.semester]['session'].findIndex(e=> e === item.session)+1:null}
                                                </CustomTableCell>
                                                <CustomTableCell align='center'>
                                                    {item.session}
                                                </CustomTableCell>
                                                <CustomTableCell align='center'>
                                                    {item.subject}
                                                </CustomTableCell>
                                                <CustomTableCell align='center'>
                                                    {item.batch}
                                                </CustomTableCell>
                                                <CustomTableCell align='center'>
                                                    {item.group}
                                                </CustomTableCell>
                                                <CustomTableCell align='center'>
                                                    {item.semester}
                                                </CustomTableCell>
                                                <CustomTableCell align='center'>
                                                    {item.course}
                                                </CustomTableCell>
                                                <CustomTableCell align='center'>
                                                    {item.week}
                                                </CustomTableCell>
                                        </TableRow>
                                        flag = false
                                        return row
                                        })
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
        </>
    )
}

FacultyTimeTableView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state=>({
    facultyTT: state.initData.facultyTT,
})) (withStyles(styles)(FacultyTimeTableView))