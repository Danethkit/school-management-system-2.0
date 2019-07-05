import React, { Component } from "react"
import PropTypes from "prop-types"
import {requestStudent, createAttendanceSheet} from '../../redux/ActionCreator/apiRequest'
import {onRemarkChange} from '../../redux/ActionCreator/userBehavior'
import {
  TableBody,
  TableRow,
  TableCell,
  Table,
  Checkbox,
  withStyles,
  Typography,
  InputBase,
  Box,
  LinearProgress
} from "@material-ui/core"
import SessionTableHead from "./SessionTableHead"
import SessionTableToolBar from "./SessionTableToolBar"
import AttendanceButton from "../Button/AttendanceButton"
import { connect } from 'react-redux'
import { store } from '../../redux/store'
import AttendanceSheetDialog from '../Alert/AttendanceSheetDialog'



const styles = theme => ({
  root: {
    witdth: "100%",
    marginTop: theme.spacing(3),
  },
  table: {
    minWroll_numberth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },

  textRow: {
    fontSize: 13
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
    studentData : state.initData.studentData ,
    isPending: state.initData.isPending,
    subjectInfo: state.initData.subjectInfo,
    error: state.initData.error,
    batch: state.changePicker.batch,
    course: state.changePicker.course,
    semester: state.changePicker.semester,
    session: state.changePicker.session,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestStudent: () => dispatch(requestStudent()),
    createAttendanceSheet: (data) => dispatch(createAttendanceSheet(data)),
    onChangeRemark: (data) => dispatch(onRemarkChange(data))
  }
}

class SessionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      selected: {},
    };
  }
// close success dialog when request success
  closeSuccessDialog = () => {
    this.setState({successDialog:false})
  }
  // get all inputed data and request for create attendance sheet
  createAttendanceSheet = () => {
    let { createAttendanceSheet, session } = this.props
    let selectedStu = this.state.selected[session]
    let storeData = store.getState()
    let {subject, date, batch, remark, semester} = storeData.changePicker
    // let { subjectData } = storeData.initData'
    let data = {
      subject,
      date: date.toDateString(),
      session,
      batch,
      lines: selectedStu,
      remark: remark,
      semester
    }
    createAttendanceSheet(data)
  }

  componentDidMount() {
    this.props.requestStudent()
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy });
  }
// select all students at one
  handleSelectAllClick = (event, data) => {
    let {selected} = this.state
    let {session} = this.props
    if (event.target.checked) {
      selected[session] = data.map(n => n.roll_number)
      this.setState({selected})
      return;
    }
    selected[session] = []
    this.setState({ selected });
  }
// user input remark data
  onChangeRemark = (event, roll_number) => {
    let storeData = store.getState()
    let { remark } = storeData.changePicker
    remark[roll_number] = event.target.value
    let { onChangeRemark } = this.props
    onChangeRemark(remark)
  }

  handleClick = (event, roll_number) => {
    const { selected } = this.state;
    const {session} = this.props
    if(!session) return
    if(session in selected){
      const selectedIndex = selected[session].indexOf(roll_number);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected[session], roll_number);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected[session].slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected[session].slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected[session].slice(0, selectedIndex),
          selected[session].slice(selectedIndex + 1)
        );
      }
      selected[session] = newSelected
    }else {
      selected[session] = [roll_number]
    }
    this.setState({ selected });
  }

  handleDuplicateSession = (newSelected) => {
    let {course, batch, semester, group, subjectInfo, session} = this.props
    let {selected} = this.state
    if(!(session in selected)) return
    let sessions = subjectInfo[course][batch][semester][group]['session']
    sessions.filter((e,i) => newSelected.includes(i+1))
    .forEach(element => {
      selected[element] = selected[session]
    });
    this.setState(selected)
  }

  isSelected = roll_number =>{
    let {session} = this.props
    let {selected} = this.state
    if(session in selected){
      return this.state.selected[session].indexOf(roll_number) !== -1;
    }
    return false
  }

  render() {
    const { classes, studentData, batch, session, sessions, sessionNumber} = this.props
    const { order, orderBy, selected } = this.state
    let numSelected = 0
    if(session in selected){
      numSelected =  selected[session].length
    }
    let data = []
    try{
      data = batch in studentData ? studentData[batch] : []
    }catch(err){data = []}

    return (
      <>
      {
        data.length === 0 ? <LinearProgress /> 
        : <>
        <Box className={classes.root} boxShadow={2}>
          <SessionTableToolBar numSelected={numSelected} handleDuplicateSession={this.handleDuplicateSession} sessions={sessions} sessionNumber={sessionNumber}/>
          <div className={classes.tableWrapper}>
            <Table aria-labelledby="tableTitle"  >
              <SessionTableHead
                numSelected={numSelected}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={event => this.handleSelectAllClick(event, data)}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy)).map(n => {
                  const isSelected = this.isSelected(n.roll_number);
                  return (
                    <TableRow
                      hover
                      // onClick={event => this.handleClick(event, n.roll_number)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.roll_number}
                      selected={isSelected}>
                      <TableCell padding="checkbox" onClick={event => this.handleClick(event, n.roll_number)}>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell scope="row" onClick={event => this.handleClick(event, n.roll_number)}>
                        {n.roll_number}
                      </TableCell>
                      <TableCell  align="left" onClick={event => this.handleClick(event, n.roll_number)}>
                        {n.last_name + ' ' +n.name}
                      </TableCell>
                      <TableCell  align="center" onClick={event => this.handleClick(event, n.roll_number)}>
                        {isSelected ? (
                          <div>Yes</div>
                        ) : (
                          <div style={{ color: "#E74C3C" }}>No</div>
                        )}
                      </TableCell>
                      <TableCell className={classes.textRow}>
                        <InputBase align="center" multiline fullWidth={true} onChange={event => this.onChangeRemark(event, n.roll_number)}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography variant="subtitle2">
                      Total Present :
                    </Typography>
                  </TableCell>
                  <TableCell >{numSelected}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Total Absent :</Typography>
                  </TableCell>
                  <TableCell >
                    {data.length - numSelected}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Box>
        <AttendanceButton  onClick={this.createAttendanceSheet}/>
        <AttendanceSheetDialog />
        </>
      }
      </>
    );
  }
}
SessionTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SessionTable));
