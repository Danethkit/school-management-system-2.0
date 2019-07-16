import React, { useState, useEffect } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Tab,
  Tabs,
  Toolbar
} from "@material-ui/core";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core";
import { Chat, AlternateEmail } from "@material-ui/icons";
import SideBarDrawer from "../NavigationBar/SideBarDrawer";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Input from "@material-ui/icons/Input";
import Person from "@material-ui/icons/Person";
import Group from "@material-ui/icons/Group";
import Subtitles from "@material-ui/icons/Subtitles";
import List from "@material-ui/icons/List";
import Print from "@material-ui/icons/Print";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  iconButtonBlock: {
    fontSize: 10,
    height: 10
  },
  menuButton: {
    marginRight: 0,
    marginLeft: -20
  },
  hide: {
    display: "none"
  },
  tabs: {
    flexGrow: 1
  },
  tab: {
    minWidth: 0,
    textColor: "#fff"
  }
});

const navBar = [
  "Discuss",
  "OpenEduCat",
  "Attendance",
  "Assignments",
  "Event",
  "TimeTable",
  "Exams",
  "Library",
  "Apps",
  "Settings"
];

const NavigationBar = ({ classes, history, userIden }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState("/sms/attendance");

  useEffect(() => {
    const pathnameSplit = history.location.pathname.split("/");

    if (history.location.pathname !== route)
      setRoute(
        [pathnameSplit[0], pathnameSplit[1], pathnameSplit[2]].join("/")
      );
  });

  const changeNavigateRoute = (event, route) => {
    setRoute(route);
    history.push(route);
  };

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuOpen(open);
  };

  var items = [];
  if (history.location.pathname.includes("/timetable")) {
    items = [
      {
        path: "timetable/admin-create",
        label: "Generate Timetable",
        icon: <Input />
      },
      { path: "timetable/student", label: "Student", icon: <Group /> },
      { path: "timetable/faculty", label: "Faculty", icon: <Person /> }
    ];
  } else {
    items = [
      {
        path: "attendance/attendance_sheet",
        label: "Attendance Sheet",
        icon: <Subtitles />
      },
      {
        path: "attendance/attendance_line",
        label: "Attendance Lines",
        icon: <List />
      },
      {
        path: "attendance/generate_report",
        label: "Generate Report",
        icon: <Print />
      }
    ];
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            className={menuOpen ? classes.hide : classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <SideBarDrawer
            open={menuOpen}
            toggleDrawer={toggleDrawer}
            items={items}
            userIden={userIden}
          />
          <Tabs
            variant="scrollable"
            scrollButtons="off"
            className={classes.tabs}
            value={route}
            onChange={changeNavigateRoute}
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
            <Avatar
              className={classes.iconButtonBlock}
              alt="avatar"
              src={`data:image/png;base64, ${userIden["img"]}`}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default connect(state => ({ userIden: state.initData.userIden }))(
  withStyles(styles)(NavigationBar)
);
