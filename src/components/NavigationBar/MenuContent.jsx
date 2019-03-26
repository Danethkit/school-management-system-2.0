import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import "./MenuContent.css";

export default class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  render() {
    const { items } = this.props;

    return (
      <div className="menu-item">
        {items.map(item => (
          <MenuItem key={item}>
            <Link to={`/${item}`} onClick={this.props.closeCallback}>
              {item}
            </Link>
          </MenuItem>
        ))}
      </div>
    );
  }
}
