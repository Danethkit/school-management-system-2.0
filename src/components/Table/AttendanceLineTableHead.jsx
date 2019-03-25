import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";

const rows = [
  {
    id: "student",
    numeric: false,
    disablePadding: false,
    label: "Student"
  },
  { id: "subject", numeric: true, disablePadding: false, label: "Subject" },
  { id: "session", numeric: true, disablePadding: false, label: "Session" },
  { id: "present", numeric: true, disablePadding: false, label: "Present" },
  { id: "date", numeric: true, disablePadding: false, label: "Date" },
  { id: "absent", numeric: true, disablePadding: false, label: "Absent" },
  { id: "classes", numeric: true, disablePadding: false, label: "Classes" },
  {
    id: "percentile",
    numeric: true,
    disablePadding: false,
    label: "Percentile"
  },
  { id: "remark", numeric: true, disablePadding: false, label: "Remark" }
];

export default class AttendanceLineTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                variant="body"
                key={row.id}
                align={row.numeric ? "center" : "left"}
                padding={(row.disablePadding = "flex")}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
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
AttendanceLineTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};
