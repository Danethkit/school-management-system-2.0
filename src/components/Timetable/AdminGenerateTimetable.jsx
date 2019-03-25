import React from 'react'
import {FormControl, InputLabel, InputBase, OutlinedInput, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import HeaderForm from "../../table/header_form";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,

    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 375,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    generateTimetable:{
        backgroundColor:"#efefef",
        paddingBottom:1,
        borderColor:"#ccc",
        borderStyle:"solid",
        borderRadius:3,
        borderWidth: 1,
        marginRight:3,
        marginLeft:3,
        marginBottom:5
    },

    headContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop:10,
        marginBottom:-30,
        marginLeft: 10,
        marginRight:10,
        borderWidth:1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop:15,
        marginBottom:10,
        marginLeft: 15,
        marginRight:15,
    },
    formControl: {
        margin: theme.spacing.unit,
        flexGrow:1,
        fullWidth:1,
        textColor:'secondary',
        height:40,
        backgroundColor:"#fff"

    },
    inputLabel:{
        fontSize: 14,
        lineHeight:0,

    },
    outLinedInput:{
        color: 'primary'
    },
    margin: {
        margin: theme.spacing.unit,
        width: '100%',
        textAlign:'center',
        fontSize:12,
    },

})


let id = 0;
// function to input value to table header
function inputData(ses,sun,mon,tue,wen,thu,fri,sat) {
    id += 1;
    return {id, ses,sun,mon,tue,wen,thu,fri,sat};
}
const headData = [
    inputData("Session","Sunday","Monday", "Tuesday", "Wenesday","Thursday", "Friday", "Satursday",)
];

// function to input value to table body
function createData(ses,sun,mon,tue,wen,thu,fri,sat) {
    id += 1;
    return {id, ses,sun,mon,tue,wen,thu,fri,sat};
}
const bodyData = [
    createData("8:00am - 8:50am",),
    createData("8:51am - 9:40am",),
    createData("9:41am - 10:30am",),
    createData("10:46am - 11:35am",),
    createData("10:36am - 12:25am",),
    createData("1:25pm - 2:15pm",),
    createData("2:16pm - 3:05pm",),
    createData("3:21m - 04:10pm",),
    createData("4:10pm - 5:00pm",),
];

function createTable(course, batch, group,semester, week) {
    id += 1;
    return {
        id, course, batch, group, semester, week
    }
}
const numberTable = [
    createTable("Software EE", 2,1,7,),
    createTable("Software EE", 3,1,5,),
    createTable("Software EE", 4,1,3,),
    createTable("Software EE", 5,1,2,),
    createTable("Software EE", 6,1,1,),
    createTable("Software EE", 6,1,1,),
    createTable("Software EE", 6,1,1,),
];




class GenerateTimetable extends React.Component{



    componentDidMount() {
        this.forceUpdate();
    }


    render(){
        const {classes} = this.props;

        return(
            <React.Fragment>
                <HeaderForm/>
                {numberTable.map(table => (
                    <div className={classes.generateTimetable} key={table.id}>
                        <div className={classes.headContainer}>
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
                                    value={table.course}
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
                                    value={table.batch}
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
                                    value={table.semester}
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
                                    value={table.group}
                                    className={classes.outLinedInput}
                                    labelWidth={this.labelRef4 ? this.labelRef4.offsetWidth : 0}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl} variant="outlined">
                                <InputLabel
                                    label={"Week"}
                                    className={classes.inputLabel}
                                    ref={ref => {
                                        this.labelRef5 = ReactDOM.findDOMNode(ref);
                                    }}
                                    htmlFor="component-outlined"
                                >
                                    Week
                                </InputLabel>
                                <OutlinedInput
                                    value={table.week}
                                    className={classes.outLinedInput}
                                    labelWidth={this.labelRef5 ? this.labelRef5.offsetWidth : 0}
                                />
                            </FormControl>
                        </div>


                        <div className={classes.container}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        {headData.map(row => (
                                            <TableRow className={classes.row} key={row.id}>
                                                <CustomTableCell align='center'>{row.ses}</CustomTableCell>
                                                <CustomTableCell align='center'>{row.sun}</CustomTableCell>
                                                <CustomTableCell align='center'>{row.mon}</CustomTableCell>
                                                <CustomTableCell align='center'>{row.tue}</CustomTableCell>
                                                <CustomTableCell align='center'>{row.wen}</CustomTableCell>
                                                <CustomTableCell align='center'>{row.thu}</CustomTableCell>
                                                <CustomTableCell align='center'>{row.fri}</CustomTableCell>
                                                <CustomTableCell align='center'>{row.sat}</CustomTableCell>
                                            </TableRow>
                                        ))}
                                    </TableHead>
                                    <TableBody>
                                        {bodyData.map(row => (
                                                <TableRow className={classes.row} key={row.id}>

                                                    <CustomTableCell align='center'>{row.ses}</CustomTableCell>

                                                    <CustomTableCell align='center'><InputBase className={classes.margin} multiline /></CustomTableCell>
                                                    <CustomTableCell align='center'><InputBase className={classes.margin} multiline /></CustomTableCell>
                                                    <CustomTableCell align='center'><InputBase className={classes.margin} multiline /></CustomTableCell>
                                                    <CustomTableCell align='center'><InputBase className={classes.margin} multiline /></CustomTableCell>
                                                    <CustomTableCell align='center'><InputBase className={classes.margin} multiline /></CustomTableCell>
                                                    <CustomTableCell align='center'><InputBase className={classes.margin} multiline /></CustomTableCell>
                                                    <CustomTableCell align='center'><InputBase className={classes.margin} multiline /></CustomTableCell>

                                                </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>


                    </div>
                ))}
            </React.Fragment>
        )
    }
}
GenerateTimetable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenerateTimetable)