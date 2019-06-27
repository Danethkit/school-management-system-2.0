import React from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Tab,
  Tabs,
  Toolbar
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from "@material-ui/core";
import { AccountCircle, Chat, AlternateEmail } from "@material-ui/icons";
import SideBarDrawer from '../NavigationBar/SideBarDrawer'

const styles = theme => ({
  root: {
    flexGrow: 0,
    // backgroundColor: "#000",
    padding: -10,
    paddingLeft: -10
  },

  iconButtonBlock: {
    marginRight: -10,
    fontSize: 10
  },

  menuButton: {
    marginRight: 0,
    marginLeft: -20,
    // marginRight: theme.spacing(2),
  },
  hide : {
    display: 'none'
  },
  tabs: {
    flexGrow: 0
  },
  tab: {
    minWidth: 1,
    textColor: "#fff",
  }
});

const navBar = [
  "Facultices",
  "Attendances",
  "Assignments",
  "Event",
  "TimeTable",
  "Exams",
  "Library",
  "Apps",
  "App Setting"
];

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      route: "/sms/attendances"
    };
  }

  changeNavigateRoute = (event, route) => {
    this.setState({ route });
    this.props.history.push(route);
  };

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ ...this.state, menuOpen: open });
  };

  render() {
    var items = [];
    if(this.props.history.location.pathname.includes("/timetable")){
      items = [
        {path: "timetable/admin-view", label: "Current Timetable"},
        {path: "timetable/admin-create", label: "Create TimeTable"},
        {path: "timetable/student", label: "Student"},
        {path: "timetable/faculty", label: "Faculty"}
      ];
    }
    else {
      items = [
        {path: "attendance/attendance_sheet", label: "Attendance Sheet"},
        {path: "attendance/attendance_line", label: "Attendance Lines"},
        {path: "attendance/generate_attendance", label: "Generate Attendance"},
        {path: "attendance/attendance_result", label: "Attendance Result"},
        {path: "attendance/generate_report", label: "Generate Report"}
      ];
    }

    const { classes } = this.props;
    const { menuOpen } = this.state

    return (
      <>
        <AppBar position="static">
          <Toolbar variant="dense" display="flex" className={classes.root} color='primary'>
            <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.toggleDrawer(true)}
            edge="start"
            className={menuOpen ? classes.hide : classes.menuButton}>
                <MenuIcon />
            </IconButton>
            <SideBarDrawer open={menuOpen} toggleDrawer={this.toggleDrawer} items={items}/>
            <Tabs
              variant="scrollable"
              scrollButtons="off"
              className={classes.tabs}
              value={this.state.route}
              onChange={this.changeNavigateRoute}
            >
              {navBar.map(label => (
                <Tab
                  label={label}
                  className={classes.tab}
                  key={label}
                  value={`/sms/${label.toLowerCase()}`}
                />
              ))}
            </Tabs>

            <IconButton color="inherit">
              <Badge badgeContent={7} color="secondary">
                <AlternateEmail />
              </Badge>
            </IconButton>

            <IconButton color="inherit" className={classes.iconButtonBlock}>
              <Badge badgeContent={17} color="secondary">
                <Chat />
              </Badge>
            </IconButton>

            <IconButton className={classes.iconButtonBlock} color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
export default withStyles(styles)(NavigationBar);
