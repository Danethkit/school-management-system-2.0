import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const options = ["Default", "Student"];

class ConfirmationDialogRaw extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: props.value
        };
    }

    // TODO
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    handleEntering = () => {
        this.radioGroupRef.focus();
    };

    handleCancel = () => {
        this.props.onClose(this.props.value);
    };

    handleOk = () => {
        this.props.onClose(this.state.value);
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value, ...other } = this.props;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">
                    Generate Option
                </DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={ref => {
                            this.radioGroupRef = ref;
                        }}
                        aria-label="Option"
                        name="option"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {options.map(option => (
                            <FormControlLabel
                                value={option}
                                key={option}
                                control={<Radio />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="secondary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func,
    value: PropTypes.string
};

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        width: "80%",
        maxHeight: 435
    }
});

class OptionGeneratePicker extends React.Component {
    state = {
        open: false,
        value: "Default"
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = value => {
        this.setState({ value, open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List>
                    <ListItem
                        button
                        divider
                        aria-haspopup="true"
                        aria-controls="option-menu"
                        aria-label="Option"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary="Generate Option"
                            secondary={this.state.value}
                        />
                    </ListItem>

                    <ConfirmationDialogRaw
                        classes={{
                            paper: classes.paper
                        }}
                        open={this.state.open}
                        onClose={this.handleClose}
                        value={this.state.value}
                    />
                </List>
            </div>
        );
    }
}

OptionGeneratePicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OptionGeneratePicker);