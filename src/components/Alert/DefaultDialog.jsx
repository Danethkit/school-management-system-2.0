import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
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

const DefaultAlert = ({img, title, open, classes, onClick, detail, error}) =>{
  return (
  <Dialog
      disableEscapeKeyDown
      open={open}
      className={classes.root}>
      <DialogTitle>{title}</DialogTitle>
      <img src={img} className={classes.icon} alt = "Sign" />
      <DialogContent><h3>{detail}</h3></DialogContent>
      <DialogContent>{error}</DialogContent>
      <DialogActions>
        <Button
            className={classes.button}
            onClick={onClick}
            size="large"
            variant="outlined"
            color="primary">
            OK
        </Button>
      </DialogActions>
  </Dialog>)
}  
export default (withStyles(styles)(DefaultAlert))
