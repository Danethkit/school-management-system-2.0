import React, {useState, useEffect} from 'react'
import {Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import DisplayTimetableHeader from "../TimetablePicker/DisplayTimetableHeader";
import FacultyDateNavigator from "./FacultyDateNavigator";
import {requestStudentTimeTable} from '../../redux/ActionCreator/apiRequest'
import {connect} from 'react-redux'
import moment from 'moment'


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
        margin: 0,
        width:100
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
    formControl: {
        margin: theme.spacing(3),
        flexGrow:1,
        fullWidth:1,
        textColor:'secondary',
        height:40,
        backgroundColor:"#fff"

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
    left: {
        flexGrow:1
    },
    right: {

    },
    middle: {
        flexGrow:1
    }

})

const weekOfYear = moment.utc().week();

const StudentView = ({dispatch, classes, studentTT}) => {

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
        dispatch(requestStudentTimeTable({date:moment('2017-11-05', 'YYYY-MM-DD').format('YYYY-MM-DD')}))
    }, [week])

    const header = ['Session']

    for (let i = 0; i < 7; i++) {
        header.push(moment.utc().week(week).weekday(i).format("ddd MM/DD"))
    }

    console.log('res', studentTT);

    return(
        <>
            <FacultyDateNavigator
                week={week}
                handleLastWeek={handleLastWeek}
                handleNextWeek={handleNextWeek}
                handleCurrentWeek={handleCurrentWeek}
                weekOfYear = {weekOfYear}
                />
            <DisplayTimetableHeader 
                header={studentTT['header']}
                week={Object.keys(studentTT).length !== 0 ? studentTT['header']['week']: null}
            />

                <div className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                    <TableRow className={classes.row}>
                                        {
                                            header.map(item => (
                                                <CustomTableCell align='center' multiline={"true"} key={item}>
                                                    {item}
                                                </CustomTableCell>
                                            ))
                                        }
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(studentTT).map(session => {
                                    const temp = []
                                    for(let i =0; i <7; i++){
                                        temp.push(<CustomTableCell align="center" key={i} >
                                        { i+1 in studentTT[session] ? studentTT[session][i+1] : null}
                                        </CustomTableCell>)
                                    }
                                    return <TableRow className={classes.row} key={session}>
                                            <CustomTableCell align="center">
                                                {session}
                                            </CustomTableCell>
                                            {temp}
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
            </div>
        </>
    )
}
StudentView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state => ({
    studentTT : state.initData.studentTT
}))(withStyles(styles)(StudentView))