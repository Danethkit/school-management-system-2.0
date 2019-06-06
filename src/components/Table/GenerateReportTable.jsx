import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import GenerateReportTableHead from "./GenerateReportTableHead";
import DownloadButton from '../Button/DownloadButton'
import {getAttendanceLine,requestStudent, printAttendanceReport } from '../../redux/ActionCreator/apiRequest'



const styles = theme => ({
    root: {
        width: "100%",
        overflowX: 'auto'
    },
    table: {
        minWidth: 1020
    },
   
    textRow: {
        fontSize: 13,

    },
    button: {
        margin: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
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
            return new Date(line.date) >= startDate && new Date(line.date) <= endDate && line.present && subjects.includes(line.subject) && line.group === group && line.batch === batch
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
        let i =0
        let subj = []
        
        Object.values(res).forEach(e => {
           let diff = Object.keys(e).filter(x => !subj.includes(x));
           if(diff){
               subj = [...subj, ...diff]
           }
        })

        return (
            <>
                <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <GenerateReportTableHead
                                subjects = {subj }
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(studentData[batch], getSorting(order, orderBy)).map(row => {
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
                                                subj.map((e, i)=> {
                                                    return <TableCell  className={classes.textRow} padding="none" key={i}>{res[row.last_name +' '+ row.name][e]}</TableCell>
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
                </Paper>
                <DownloadButton classes ={classes} handleClick={()=> dispatch(printAttendanceReport())} />
                
            </>
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