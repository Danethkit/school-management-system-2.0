import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  icon: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginLeft: 100,
    marginBottom: 20,
    marginRight: 100
  },
  button: {
    marginRight: 60
  }
});

class AttendanceButton extends React.Component {
  state = {
    open: false
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
      <Grid container justify="flex-end" alignItems="flex-end">
      <Button
          color="secondary"
          variant="outlined"
          onClick={this.handleClickOpen}
          
        >
          Save
        </Button>
      </Grid>
       
        <Dialog
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.root}
        >
          <DialogTitle>Saved!</DialogTitle>
          <img src={require("./Done.png")} className={classes.icon} />
          <DialogContent>You have saved it successfully!</DialogContent>
          <DialogActions>
            <Button
              className={classes.button}
              onClick={this.handleClose}
              size="large"
              variant="outlined"
              color="secondary"
            >
              OK
            </Button>
            <Button
              className={classes.button}
              onClick={this.handleClose}
              size="large"
              variant="outlined"
              color="primary"
            >
              VIEW
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AttendanceButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AttendanceButton);
