import React from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import { withStyles} from "@material-ui/core";
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
    sessionFrom: '',
    sessionTo: '',
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeFrom = e => {
    this.setState( {sessionFrom : e.target.value})
  }
  handleChangeTo = e => {
    this.setState( {sessionTo : e.target.value})
  }
  onChangeSession = (e) =>{
    console.log('value')
  }


  render() {
    const { classes, sessionNames } = this.props;

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
              <DropBox placeholder={"Duplicate From"}
                       handleChange={this.handleChangeFrom}
                       session={this.state.sessionFrom}
                       items={sessionNames}
                  />

              <DropBox placeholder={"Duplicate To"}
                       handleChange={this.handleChangeTo}
                       items={sessionNames}
                       session={this.state.sessionTo}/>
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
