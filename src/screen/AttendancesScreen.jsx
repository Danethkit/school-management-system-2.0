import React, { Component } from "react";
import { AppBar, Tabs, Tab, withStyles } from "@material-ui/core";
import HeadPicker from "../components/Picker/HeadPicker";
import SessionTable from "../components/Table/SessionTable";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  }
});
class AttendancesSheet extends Component {
  state = {
    sessionNumber: 1
  };
  handleChangeSessionNumber = (event, sessionNumber) => {
    this.setState({ sessionNumber });
  };

  createSessionTab(classTab) {
    let tabs = [];
    for (let i = 1; i < 10; i++) {
      tabs.push(
        <Tab label={"session " + i} className={classTab} key={i} value={i} />
      );
    }
    return tabs;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>Attendance Sheet</h1>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.sessionNumber}
            onChange={this.handleChangeSessionNumber}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            classes={{ root: classes.tabRoot }}
            scrollButtons="on"
          >
            {this.createSessionTab(classes.tab)}
          </Tabs>
        </AppBar>
        <HeadPicker />
        <SessionTable />
      </div>
    );
  }
}
export default withStyles(styles)(AttendancesSheet);
