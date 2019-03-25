import React from 'react';
import ReactDOM from 'react-dom'
import {Form,Paper,FormControl,InputLabel,OutlinedInput,TextField, Grid,withStyles} from "@material-ui/core";
import classNames from "classnames"

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
    formFill:{
        margin:0,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 10,
        marginRight:10,
    },
    formControl: {
        margin: theme.spacing.unit,
        flexGrow:1,
        fullWidth:1,
        textColor:'secondary',
        height:40,

    },
    inputLabel:{
        fontSize: 14,
        lineHeight:0,

    },
    outLinedInput:{
        color: 'primary'
    },


});



class HeaderForm  extends React.Component
{


    componentDidMount() {
        this.forceUpdate();
    }

    render()
    {
        const{ classes } = this.props;
        return(
            <div>

                <div className={classes.container}>
                    {/*<Paper  className={classes.paperStyle} >*/}

                    <FormControl className={classes.formControl}  variant="outlined" >
                        <InputLabel
                            className={classes.inputLabel}
                            ref={ref => {
                                this.labelRef1 = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="component-outlined"
                        >
                            Course
                        </InputLabel>
                        <OutlinedInput
                            className={classes.outLinedInput}
                            labelWidth={this.labelRef1 ? this.labelRef1.offsetWidth : 0}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel
                            className={classes.inputLabel}
                            ref={ref => {
                                this.labelRef2 = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="component-outlined"
                        >
                            Batch
                        </InputLabel>
                        <OutlinedInput
                            className={classes.outLinedInput}
                            labelWidth={this.labelRef2 ? this.labelRef2.offsetWidth : 0}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel
                            className={classes.inputLabel}
                            ref={ref => {
                                this.labelRef3 = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="component-outlined"
                        >
                            Semester
                        </InputLabel>
                        <OutlinedInput
                            className={classes.outLinedInput}
                            labelWidth={this.labelRef3 ? this.labelRef3.offsetWidth : 0}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel
                            className={classes.inputLabel}
                            ref={ref => {
                                this.labelRef4 = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="component-outlined"
                        >
                            Group
                        </InputLabel>
                        <OutlinedInput
                            className={classes.outLinedInput}
                            labelWidth={this.labelRef4 ? this.labelRef4.offsetWidth : 0}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel
                            className={classes.inputLabel}
                            ref={ref => {
                                this.labelRef5 = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="component-outlined"
                        >
                            Week
                        </InputLabel>
                        <OutlinedInput
                            className={classes.outLinedInput}
                            labelWidth={this.labelRef5 ? this.labelRef5.offsetWidth : 0}
                        />
                    </FormControl>
                    {/*</Paper>*/}
                </div>
            </div>
        )
    }

}



export default withStyles(styles)(HeaderForm);