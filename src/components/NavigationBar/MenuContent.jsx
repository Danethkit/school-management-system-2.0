import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

export default ({items, toggleDrawer}) =>  (
  <div className="menu-item">
    {items.map((item, key) => (
      <MenuItem  key={key}>
        <Link  to={`/${item.path}`} onClick={toggleDrawer(false)}>
          {item.label}
        </Link>
      </MenuItem>
    ))}
  </div>
);
