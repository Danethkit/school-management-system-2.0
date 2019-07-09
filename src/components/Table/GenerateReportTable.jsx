import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Box, Table, TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import GenerateReportTableHead from "./GenerateReportTableHead";
import DownloadButton from '../Button/DownloadButton'
import {getAttendanceLine,requestStudent, printAttendanceReport } from '../../redux/ActionCreator/apiRequest'
import printJS from 'print-js'

const styles = theme => ({
    root: {
        width: "100%",
        overflowX: 'auto',
        marginTop: 10,
    },
    table: {
        minWidth: 1020
    },
    textRow: {
        fontSize: 13,

    },
    button: {
        margin: theme.spacing(3)
    },
    leftIcon: {
        marginRight: theme.spacing(3)
    },

    iconSmall: {
        fontSize: 20
    }
});

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    if(!array) return []
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const GenerateReportTable = (props) => {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('roll_number')

    let { attendanceLine, dispatch, studentData, batch, group, endDate, startDate, course, classes, subjectInfo, semester } = props

    console.log({subjectInfo});
    const handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (orderBy === property && order === "desc") {
            order = "asc";
        }
        setOrder(order)
        setOrderBy(orderBy)
    };

    const handleClickPrintReport =  () => {
        dispatch(getAttendanceLine({course, batch, group, endDate, startDate, semester }))
    }

    useEffect(() => {
        if(Object.keys(studentData).length === 0){
            dispatch(requestStudent())
        }
    }, [])



    let subjects = []
    try{
        if(Object.keys(subjectInfo).length !== 0){
            subjects = subjectInfo[course][batch][semester][group]['subjects']
        }
    }catch{}


    let res = {}
    if(attendanceLine.data !== undefined) {
        attendanceLine.data.forEach(line => {
            if(line.student in res){
                if(line.subject in res[line.student]){
                    res[line.student][line.subject] += 1
                }else {
                    res[line.student][line.subject] = 1
                }
            }else {
                let temp = {}
                temp[line.subject] = 1
                res[line.student] = temp
            }
        })
    }
    const printReport = () => {
        printJS({
            printable: 'attendanceReport',
            type: 'html',
            style:'#attendanceReport {min-width:2000}',
            targetStyle:['min-width']
          })
    }
    return (
        <>
        <Button variant='contained' color='secondary' onClick={handleClickPrintReport}>Print Report</Button>
        {
        Object.keys(res).length !== 0 ?
        <>
            <Box className={classes.root} boxShadow={3} >
                    <Table className={classes.table} id="attendanceReport">
                        <GenerateReportTableHead
                            subjects = {subjects }
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(studentData[course][batch][group], getSorting(order, orderBy)).map((row,i) => {
                                return (
                                    <TableRow hover key={row.roll_number}>
                                        <TableCell className={classes.textRow}>
                                            {++i}
                                        </TableCell>
                                        <TableCell className={classes.textRow} >
                                            {row.roll_number}
                                        </TableCell>
                                        <TableCell className={classes.textRow} padding="none">
                                            {row.last_name +' '+ row.name}
                                        </TableCell>
                                        {
                                            subjects.map((e, i)=> {
                                                let key = row.last_name +' '+ row.name
                                                return <TableCell  className={classes.textRow} padding="none" key={i}>{
                                                    res[row.last_name +' '+ row.name] === undefined ? 0 :
                                                    e.subject in res[key] ? res[key][e.subject]: 0}
                                                    </TableCell>
                                            })
                                        }
                                        <TableCell className={classes.textRow}>
                                            {row.total}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
            </Box>
            <DownloadButton classes ={classes} handleClick={printReport} />
                </>
            :null}
            </>
    );
}


GenerateReportTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(state => ({
    endDate: state.changePicker.endDate,
    startDate: state.changePicker.startDate,
    batch: state.changePicker.batch,
    group: state.changePicker.group,
    semester: state.changePicker.semester,
    course: state.changePicker.course,
    attendanceLine: state.initData.attendanceLine,
    studentData : state.initData.studentData,
    subjectInfo : state.initData.subjectInfo,
})) (withStyles(styles)(GenerateReportTable))