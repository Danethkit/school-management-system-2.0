import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import GenerateReportTableHead from "./GenerateReportTableHead";
import DownloadButton from '../Button/DownloadButton'
import {getAttendanceLine,requestStudent, printAttendanceReport } from '../../redux/ActionCreator/apiRequest'

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

class GenerateReportTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: "asc",
            orderBy: "roll_number",
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }
        this.setState({ order, orderBy });
    };

    componentDidMount(){
        let { attendanceLine, dispatch, studentData } = this.props
        if(attendanceLine.length === 0){
            dispatch(getAttendanceLine())
        }
        if(Object.keys(studentData).length === 0){
            dispatch(requestStudent())
        }
    }

    render() {

        const { classes, batch, group, subjects, attendanceLine, endDate, startDate, studentData, dispatch } = this.props;
        let filterLine = attendanceLine.filter(line => {
            return new Date(line.date) >=  startDate && new Date(line.date) <= endDate && line.present && subjects.includes(line.subject) && line.group === group && line.batch === batch
        } )

        let res = {}
        filterLine.forEach(line => {
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
        const { order, orderBy } = this.state;
        return (
            Object.keys(res).length !== 0 ?
            <>
                <Box className={classes.root} boxShadow={3}>
                        <Table className={classes.table}>
                            <GenerateReportTableHead
                                subjects = {subjects }
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(studentData[batch], getSorting(order, orderBy)).map((row,i) => {
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
                                                    return <TableCell  className={classes.textRow} padding="none" key={i}>{
                                                        e in res[row.last_name +' '+ row.name] ? res[row.last_name +' '+ row.name][e]: 0}
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
                <DownloadButton classes ={classes} handleClick={()=> dispatch(printAttendanceReport())} />
            </>: <h1>No Record...</h1>
        );
    }
}

GenerateReportTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(state => ({
    subjects: state.changePicker.subjects,
    endDate: state.changePicker.endDate,
    startDate: state.changePicker.startDate,
    batch: state.changePicker.batch,
    group: state.changePicker.group,
    attendanceLine: state.initData.attendanceLine,
    studentData : state.initData.studentData
})) (withStyles(styles)(GenerateReportTable))