import React from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import DropBox from './DropBox'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  }
});

class DuplicateSession extends React.Component {
  state = {
    open: false,
    startSession: '',
    endSession: ''
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onChangeSession = (value) =>{
    console.log('value')
  }


  render() {
    const { classes, sessionData } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen} color='primary' variant='outlined'>
          Select to duplicate session
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Fill the session to duplicate:</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <DropBox placeholder="From" items={sessionData} handleChange={this.onChangeSession} />
              <DropBox placeholder="To" items={sessionData} handleChange={this.onChangeSession} />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DuplicateSession.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(state=>({sessionData: state.initData.sessionData}))(withStyles(styles)(DuplicateSession))
