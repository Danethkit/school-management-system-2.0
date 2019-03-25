import React from 'react'
import {AppBar, Badge, IconButton, Tab, Tabs, Toolbar} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { withStyles} from "@material-ui/core"
import {AccountCircle,Chat,AlternateEmail} from "@material-ui/icons"

const navBar = ['Facultices', 'Attendances','Assignments', 'Event',
             'TimeTables', 'Exams', 'Library', 'Apps', 'App Setting']
const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    iconButtonBlock:{
        marginRight: -10,
    },

    menuButton: {
        marginRight: 2,
        marginLeft : -18,

    },
    tabs:{
        flexGrow: 1,
    },
    tab:{
        minWidth:1,
        textColor:"#fff"

    }
})

class NavigationBar  extends React.Component{

    state ={
        route:'/facultices',
    }

    ChangeNavigateRoute = (event, route) =>{
        this.setState({route})
        this.props.history.push(route);
    } 

    render() {

        const { classes }= this.props;
        return(
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar variant="dense" display="flex">

                        <IconButton  className={classes.menuButton} color="inherit" >
                            <MenuIcon />
                        </IconButton>

                        <Tabs
                            variant="scrollable" scrollButtons="off"
                            className={classes.tabs}
                            value={this.state.route}
                            onChange={this.ChangeNavigateRoute}
                            indicatorColor='secondary'>
                                {
                                    navBar.map(label => 
                                        <Tab label={label} className={classes.tab} key={label} value={`/${label.toLowerCase()}`}/>)
                                }  
                        </Tabs>

                        <IconButton

                            color="inherit"
                        >
                            <Badge badgeContent={17} color="secondary">
                                <AlternateEmail />
                            </Badge>

                        </IconButton>

                        <IconButton
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="secondary">
                                <Chat />
                            </Badge>

                        </IconButton>

                        <IconButton
                            className={classes.iconButtonBlock}
                            color="inherit"
                        >
                            <AccountCircle />

                        </IconButton>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }

}
export default withStyles(styles)(NavigationBar)