import * as React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { Collapse } from "@mui/material";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export function MinusSquare(props: any) {
  return <KeyboardArrowDown />;
}

export function PlusSquare(props: any) {
  return <KeyboardArrowUp />;
}

export function CloseSquare(props: any) {
  return <></>;
}

export function TransitionComponent(props: any) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};
