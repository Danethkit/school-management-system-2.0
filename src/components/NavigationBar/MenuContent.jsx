import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

export default ({items, toggleDrawer}) =>  (
  <div className="menu-item">
    {items.map((item, key) => (
        <Link  to={`/${item.path}`} onClick={toggleDrawer(false)} key={key}>
            <MenuItem>
            {item.label}
            </MenuItem>
        </Link>
    ))}
  </div>
);
