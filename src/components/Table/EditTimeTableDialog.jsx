import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import EditTimeTable from '../Table/EditTimeTable'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import {connect} from 'react-redux'
import {editTimeTable} from '../../redux/ActionCreator/apiRequest'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
}));
export default connect()(({open, handleClose, handleChange, editMode ,currentWeek, editTT, header, dispatch, ...rest}) =>{

    const handleSaveEdit =() => {
      dispatch(editTimeTable(editTT))
    }

    const classes = useStyles()
    return (
    <div>
      <Dialog
      fullScreen
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Edit
              <Switch
                checked={editMode}
                onChange={handleChange()}
                value="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </Typography>
            <Button color="inherit" onClick={handleSaveEdit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle id="alert-dialog-title">{`${header.course} / ${header.batch} / ${header.semester} / ${header.group} / ${currentWeek.name}`}</DialogTitle>
        <DialogContent>
            <EditTimeTable currentWeek ={currentWeek} editTT={editTT} {...rest} editMode={editMode}/>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
})
