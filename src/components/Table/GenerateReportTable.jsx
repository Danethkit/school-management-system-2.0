import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import GenerateReportTableHead from "./GenerateReportTableHead";
import Data from "../../data/generateReport.json";
import DownloadButton from '../Button/DownloadButton'
import { getSubjectData } from '../../redux/ActionCreator/apiRequest'

const styles = theme => ({
    root: {
        width: "100%"
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
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
let i = 0;

class GenerateReportTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Data.sort((a, b) => (a.roll_number < b.roll_number ? -1 : 1)),
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
        let { dispatch } = this.props
        dispatch(getSubjectData())
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy } = this.state;

        return (
            <>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <GenerateReportTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy)).map(row => {
                                    return (
                                        <TableRow hover key={row.id}>
                                            <TableCell className={classes.textRow}>

                                                {(i += 1)}
                                            </TableCell>
                                            <TableCell className={classes.textRow} padding="none">
                                                {row.roll_number}
                                            </TableCell>
                                            <TableCell className={classes.textRow} padding="none">
                                                {row.name}
                                            </TableCell>

                                            <TableCell className={classes.textRow}>
                                                {row.subject1}
                                            </TableCell>
                                            <TableCell className={classes.textRow} padding="none">
                                                {row.subject2}
                                            </TableCell>
                                            <TableCell className={classes.textRow} padding="none">
                                                {row.subject3}
                                            </TableCell>
                                            <TableCell className={classes.textRow}>
                                                {row.subject4}
                                            </TableCell>
                                            
                                            <TableCell className={classes.textRow}>
                                                {row.total}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            {/* <p style={{ display: "none" }}>{(i = 0)}</p> */}
                        </Table>
                    </div>
                </Paper>
                <DownloadButton classes ={classes}/>
                
            </>
        );
    }
}

GenerateReportTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(state => ({semSubjectData: state.requestStudentData.semSubjectData})) 
(withStyles(styles)(GenerateReportTable))