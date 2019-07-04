import React, {useState, useEffect} from 'react'
import { Grid, Paper, Table, TableBody, TableHead, TableRow, Divider} from "@material-ui/core";
import PropTypes from "prop-types";
import FacultyDateNavigator from "./FacultyDateNavigator";
import moment from 'moment'
import { requestFacultyTimeTable } from '../../redux/ActionCreator/apiRequest'
import {connect} from 'react-redux'
import CustomTableCell from '../Table/CustomTableCell'
import tableStyle from '../Table/TableStyle'

const headData = ["Date", 'Session' ,'Time', 'Subject', 'Batch', 'Group', 'Semester', 'Course', 'Week'];

const weekOfYear = moment.utc().week();

const FacultyTimeTableView = ({userIden, facultyTT, dispatch, subjectInfo}) =>{

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

    const classes = tableStyle();

    return(
        <>
            <div>
                <h2><i>Faculty:</i> {userIden['user']}</h2>
                <h3><i>Faculty Code:</i> 110101212</h3>
            </div>
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
                                                    {Object.keys(subjectInfo).length !== 0 ? subjectInfo[item.course][item.batch][item.semester][item.group]['session'].findIndex(e=> e === item.session)+1:null}
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
}))(FacultyTimeTableView)