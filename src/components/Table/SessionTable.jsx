import React, { Component } from "react"
import PropTypes from "prop-types"
import {requestStudent} from '../../action'
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Checkbox,
  withStyles,
  Typography,
  InputBase
} from "@material-ui/core"
import SessionTableHead from "./SessionTableHead"
import SessionTableToolBar from "./SessionTableToolBar"
import Data from "../../data/dataB4.json"
import AttendanceButton from "../Button/AttendanceButton"
import { connect } from 'react-redux'
import { error } from "util"



// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

const styles = theme => ({
  root: {
    witdth: "100%",
    marginTop: theme.spacing.unit 
  },
  table: {
    minWroll_numberth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  size: {
    textSize: 20
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

const mapStateToProps = (state) => {
  return {
    studentData : state.requestStudentData.studentData ,
    isPending: state.requestStudentData.isPending,
    error: state.requestStudentData.error,
    batch: state.changeBatch.batch
  }
}


class SessionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      order: "asc",
      orderBy: "name",
      selected: []
    };

  }

  
  
  componentDidMount() {
      
    
    // axios.get('http://localhost:8069/sms').then(response => {console.log('ssss', response)})
    fetch('http://localhost:8069/sms', {
      method: "GET", 
      cache: "no-cache", 
      // mode: "no-cors",
      // headers: {
      //     "Content-Type": "application/json",
      //     'Access-Control-Allow-Origin':'*',
      //     'Access-Control-Allow-Methods':'POST, GET, OPTIONS',
      //     'Access-Control-Max-Age':1000,
      //     'Access-Control-Allow-Headers':'origin, x-csrftoken, content-type, accept'
      // }
    })
    .then(response => response.json())
    .then(data => {
      console.log('data==========', data)
      this.setState({data}) 
    })
    .catch(error=> console.log('error', error))
  
  }

  componentDidMount() {
    this.props.dispatch(requestStudent())
  }

  store_data(data, check_index) {
    check_index.forEach(element => {
      data[data.findIndex(x => x.roll_number === element)].present = true;
      data[
        data.findIndex(x => x.roll_number === element)
      ].remark = !data.remark;
    });

    this.setState({ data });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy });
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.data.map(n => n.roll_number)
      }));
      return;
    }
    this.setState({ selected: [] });
  }

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
  }
  
  isSelected = roll_number => this.state.selected.indexOf(roll_number) !== -1;

  render() {
    const { classes, studentData, batch } = this.props
    const { order, orderBy, selected } = this.state
    let data = batch in studentData ? studentData[batch] : []
    
    return (
      <>
        <Paper className={classes.root}>
          <SessionTableToolBar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table aria-labelledby="tableTitle">
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
                      <TableCell scope="row">
                        {n.roll_number}
                      </TableCell>
                      <TableCell  align="left">
                        {n.last_name + ' ' +n.name}
                      </TableCell>
                      <TableCell  align="center">
                        {isSelected ? (
                          <div>Yes</div>
                        ) : (
                          <div style={{ color: "#E74C3C" }}>No</div>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <InputBase multiline />
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography variant="subheading">
                      Total Present :
                    </Typography>
                  </TableCell>
                  <TableCell >{selected.length}</TableCell>
                  <TableCell>
                    <Typography variant="subheading">Total Absent :</Typography>
                  </TableCell>
                  <TableCell >
                    {data.length - selected.length}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Paper>
        <AttendanceButton
          onSave={() => this.store_data(Data, this.state.selected)}
        />
      </>
    );
  }
}
SessionTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(withStyles(styles)(SessionTable));
