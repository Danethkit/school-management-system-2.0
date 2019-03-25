import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Checkbox
} from "@material-ui/core";

const rows = [
  {
    id: "roll_number",
    numeric: true,
    disablePadding: false,
    label: "Roll Number"
  },
  { id: "name", numeric: true, disablePadding: false, label: "Student Name" },
  { id: "present", numeric: true, disablePadding: false, label: "Present ?" },
  { id: "remark", numeric: true, disablePadding: false, label: "Remark" }
];

export default class SessionTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => (
            
              <TableCell
          
                variant="head"
                key={row.id}
                align={row.numeric ? "center" : "right"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={200}
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
           
          ))}
        </TableRow>
      </TableHead>
    );
  }
}
SessionTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};
