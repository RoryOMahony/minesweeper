import React from "react";
import "./Flex.css";

const Title = ({ text }) => {
  return (
    <div className="flex-row flex-main-axis-center">
      <h2>{text}</h2>
    </div>
  );
};

export default Title;
