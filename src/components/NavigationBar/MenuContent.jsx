import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

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
        {items.map((item, key) => (
          <MenuItem  key={key}>
            <Link  to={`/${item.path}`} onClick={this.props.closeCallback}>
              {item.label}
            </Link>
          </MenuItem>
        ))}
      </div>
    );
  }
}
