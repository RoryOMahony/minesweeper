import React from "react";
import "./Cell.css";
import "../Flex.css";

const Cell = ({cell}) => {

  const toDisplay = cell.getIsMine() ? "M" : cell.getSurroundingMines();

  return <div className="cell-container">
    <div className="cell flex-row flex-main-axis-center">{toDisplay}</div>
  </div>;
};

export default Cell;
