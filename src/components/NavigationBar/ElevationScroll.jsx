import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

export default function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    treshold: 0,
    target: window ? window() : undefined
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}
