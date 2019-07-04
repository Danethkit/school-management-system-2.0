import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

export default ({items, toggleDrawer}) =>  (
  <>
    {items.map((item, key) => (
        <Link  to={`/sms/${item.path}`} onClick={toggleDrawer(false)} key={key} style={{textDecoration:'none', color:'gray'}}>
            <MenuItem>
            {item.label}
            </MenuItem>
        </Link>
    ))}
  </>
);
