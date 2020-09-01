import React from "react";
import "./Flex.css";

const Title = ({ text }) => {
  return (
    <div className="flex-row flex-main-axis-center">
      <h1>{text}</h1>
    </div>
  );
};

export default Title;
