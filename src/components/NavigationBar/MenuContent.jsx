import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import './MenuContent.css';

export default class MenuContent extends Component {

  render() {
    return (
      <div className="menu-item">
      {/* {
          items.map(item => 
            <MenuItem>
            <Link to={`/${item}`} onClick={this.props.closeCallback}>
              {item}
            </Link>
          </MenuItem>
            )
      } */}

        <MenuItem>
          <Link to="/attendances/attendances_line" onClick={this.props.closeCallback}>
            Attendance Line
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/generate_attendances" onClick={this.props.closeCallback}>
            Generate Attendance
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/attendance_result" onClick={this.props.closeCallback}>
            Attendance Result
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/timetabl" onClick={this.props.closeCallback}>
            Current Timetable
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/timetable" onClick={this.props.closeCallback}>
            Timetable Record
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/timetable" onClick={this.props.closeCallback}>
            Generate Timetable
          </Link>
        </MenuItem>
      </div>
    );
  }
}

MenuContent.propTypes = {
  classes: PropTypes.object.isRequired,
  closeCallback: PropTypes.func.isRequired
};
