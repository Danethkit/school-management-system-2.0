import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from "@material-ui/core";
import MenuContent from './MenuContent'


const style = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function SideBarDrawer  ({toggleDrawer, open, classes, items}) {
  return (
    <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}>
            <MenuContent items={items} toggleDrawer={toggleDrawer}/>
        </div>
    </Drawer>);
}

export default withStyles(style)(SideBarDrawer)
