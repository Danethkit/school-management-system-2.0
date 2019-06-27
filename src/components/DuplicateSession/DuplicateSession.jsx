import React, {useState} from "react";
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

const DuplicateSession = ({sessionNames, classes, handleDuplicateSession}) => {

  const [sessionStart, setSessoinStart] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDuplicate = () => {
    setOpen(false);
    handleDuplicateSession(selected)
  }

  const handleChangeFrom = e => {
    setSessoinStart(e.target.value)
  }

  const handleChangeTo = e => {
    setSelected(e.target.value)
  }

  return (
    <div>
        <Button onClick={handleClickOpen} color='primary' variant='outlined'>
          Select to duplicate session
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Fill the session to duplicate:</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <DropBox placeholder={"Duplicate From"}
                       handleChange={handleChangeFrom}
                       session={sessionStart}
                       items={sessionNames ? sessionNames : []}
                  />

              <DropBox placeholder={"Duplicate To"}
                       handleChange={handleChangeTo}
                       items={sessionNames ? sessionNames.filter(e=> e > sessionStart) : []}
                       value = {selected}
                       checkBox
                       selected={selected}/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCloseDuplicate} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}



DuplicateSession.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DuplicateSession)
