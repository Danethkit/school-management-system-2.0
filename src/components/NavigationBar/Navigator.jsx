import React from "react";
import {
  AppBar,
  Badge,
  IconButton,
  Tab,
  Tabs,
  Toolbar
} from "@material-ui/core";
import CheeseburgerMenu from 'cheeseburger-menu';
import HamburgerMenu from 'react-hamburger-menu';
import { withStyles } from "@material-ui/core";
import { AccountCircle, Chat, AlternateEmail } from "@material-ui/icons";
import MenuContent from "./MenuContent";

const styles = theme => ({
  root: {
    flexGrow: 0,
    backgroundColor: "#000"
  },

  iconButtonBlock: {
    marginRight: -10
  },

  menuButton: {
    marginRight: 0,
    marginLeft: 0
  },
  tabs: {
    flexGrow: 0
  },
  tab: {
    minWidth: 1,
    textColor: "#fff"
  }
});

const navBar = [
  "Facultices",
  "Attendances",
  "Assignments",
  "Event",
  "TimeTables",
  "Exams",
  "Library",
  "Apps",
  "App Setting"
];



class NavigationBar extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      menuOpen: false,
      route: "/attendances"
    }
  }

  openMenu(){
    this.setState({ menuOpen: true })
  }

  closeMenu(){
    this.setState({ menuOpen: false })
  }

  ChangeNavigateRoute = (event, route) => {
    this.setState({ route });
    this.props.history.push(route);
  };

  render() {
    console.log('===========', this.props)
    const { history, classes } = this.props;
    
    if(history.location.pathname=="/attendances"){
        var items = ["attendline", "more"]
    }
    
    return (
      <>
        <AppBar position="static">
          <Toolbar variant="dense" display="flex" className={classes.root}>
            <CheeseburgerMenu 
            className={classes.menuButton} 
            color="inherit"
            isOpen={this.state.menuOpen}
            closeCallback = {this.closeMenu.bind(this)}
            >
            
            <MenuContent />
            </CheeseburgerMenu>
            <HamburgerMenu
              isOpen={this.state.menuOpen}
              menuClicked={this.openMenu.bind(this)}
              width={22}
           
              height={12}
              strokeWidth={1}
              rotate={0}
              color='white'
              borderRadius={0}
              animationDuration={0.7}
            />
            <Tabs
              variant="scrollable"
              scrollButtons="off"
              className={classes.tabs}
              value={this.state.route}
              onChange={this.ChangeNavigateRoute}
            >
              {navBar.map(label => (
                <Tab
                  label={label}
                  className={classes.tab}
                  key={label}
                  value={`/${label.toLowerCase()}`}
                />
              ))}
            </Tabs>
           
              <IconButton color="inherit">
                <Badge badgeContent={7} color="secondary">
                  <AlternateEmail />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
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
