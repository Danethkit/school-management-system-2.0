import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import {
    TableHead,
    TableRow,
    withStyles
} from "@material-ui/core";
import TableColumn from './TableColumn'
const styles = theme => ({
    text: {
        fontWeight: "bold",
        fontSize: 13
    }
});


class GenerateReportTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, classes, subjects } = this.props;        
       
        return (
            <TableHead>
                <TableRow>
                    <TableColumn numeric={true} disablePadding={false} id ="no"
                     label="S.no" order={order} orderBy={orderBy} classes={classes} />
                    <TableColumn numeric={true} disablePadding={true} id ="roll_number"
                     label="Roll Number" order={order} orderBy={orderBy} classes={classes} />
                    <TableColumn numeric={true} disablePadding={true} id ="name"
                     label="Subject Name" order={order} orderBy={orderBy} classes={classes} />
                    {
                        subjects.map(subject => <TableColumn numeric={true} disablePadding={true} order={order} orderBy={orderBy} 
                        classes={classes} label={subject} id={subject} />)
                    }
                    <TableColumn numeric={false} disablePadding={true} id ="total"
                     label="Total" order={order} orderBy={orderBy} classes={classes} />
                </TableRow>
            </TableHead>
        );
    }
}
GenerateReportTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
};
export default connect(state => ({
  group:state.changePicker.group,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  semester : state.changePicker.semester,
  subjectInfo : state.initData.subjectInfo,
  subjects: state.changePicker.subjects
})) (withStyles(styles)(GenerateReportTableHead))