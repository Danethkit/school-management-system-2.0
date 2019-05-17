import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    TableHead,
    TableRow,
    TableCell,
    Tooltip,
    TableSortLabel,
    withStyles
} from "@material-ui/core";
const styles = theme => ({
    text: {
        fontWeight: "bold",
        fontSize: 13
    }
});

const rows = [
    { id: "no", label: "S.No", numeric: true, disablePadding: false },
    {
        id: "roll_number",
        label: "Roll Number",
        numeric: true,
        disablePadding: true
    },
    { id: "name", label: "Student Name", numeric: true, disablePadding: true },
    { id: "subject1", label: "Subject 1", numeric: true, disablePadding: true },
    { id: "subject2", label: "Subject 2", numeric: true, disablePadding: true },
    { id: "subject3", label: "Subject 3", numeric: true, disablePadding: true },
    { id: "subject4", label: "Subject 4", numeric: true, disablePadding: true },
    { id: "total", label: "Total", numeric: false, disablePadding: true }
];

class GenerateReportTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? "left" : "center"}
                                sortDirection={orderBy === row.id ? order : false}
                                padding={row.disablePadding ? "none" : "default"}
                            >
                                <Tooltip title="Sort" enterDelay={300}>
                                    <TableSortLabel
                                        className={classes.text}
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this
                    )}
                </TableRow>
            </TableHead>
        );
    }
}
GenerateReportTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
};
export default withStyles(styles)(GenerateReportTableHead);