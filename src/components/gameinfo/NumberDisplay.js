import React from "react";
import "./NumberDisplay.css";
import "../Flex.css";

const NumberDisplay = ({ number, displayStyle }) => {
  return <div className={`number-display ${displayStyle}`}>{number}</div>;
};

export default NumberDisplay;
