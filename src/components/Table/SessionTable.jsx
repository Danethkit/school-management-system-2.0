import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Checkbox,
  withStyles,
  Typography
} from "@material-ui/core";
import SessionTableHead from "./SessionTableHead";
import SessionTableToolBar from "./SessionTableToolBar";
import dataB4 from "../../data/dataB4.json";

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

const styles = theme => ({
  root: {
    wroll_numberth: "200%",
    marginTop: theme.spacing.unit
  },
  table: {
    minWroll_numberth: 100
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class SessionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataB4,
      order: "asc",
      orderBy: "name",
      selected: []
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
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.data.map(n => n.roll_number)
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, roll_number) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(roll_number);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, roll_number);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };
  isSelected = roll_number => this.state.selected.indexOf(roll_number) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected } = this.state;

    return (
      <Paper className={classes.root}>
        <SessionTableToolBar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle" />
          <SessionTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {stableSort(data, getSorting(order, orderBy)).map(n => {
              const isSelected = this.isSelected(n.roll_number);
              return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, n.roll_number)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.roll_number}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell variant="body2" scope="row">
                    {n.roll_number}
                  </TableCell>
                  <TableCell variant="body2" align="left">
                    {n.name}
                  </TableCell>
                  <TableCell variant="body2" align="center">
                    {n.present ? <div>Yes</div> : <div>No</div>}
                  </TableCell>
                  <TableCell align="left">{n.remark}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="subheading">Total Present :</Typography>
              </TableCell>
              <TableCell variant="body2">{selected.length}</TableCell>
              <TableCell>
                <Typography variant="subheading">Total Absent :</Typography>
              </TableCell>
              <TableCell variant="body2">
                {data.length - selected.length}
              </TableCell>
            </TableRow>
          </TableBody>
        </div>
      </Paper>
    );
  }
}
SessionTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SessionTable);
