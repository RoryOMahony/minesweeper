import React from "react";
import "./NumberDisplay.css";
import "../Flex.css";

const NumberDisplay = ({ number }) => {
  function padNumber(number) {
    if (number < 0) {
      const positiveNum = number * -1;
      const paddedNum = positiveNum.toString().padStart(2, 0);
      return "-" + paddedNum;
    }
    return number.toString().padStart(3, 0);
  }

  const displayValue = padNumber(number);

  return (
    <div
      className={`number-display flex-row flex-main-axis-center flex-cross-axis-center`}
    >
      {displayValue}
    </div>
  );
};

export default NumberDisplay;
