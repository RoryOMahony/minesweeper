import React from "react";
import "./Cell.css";
import "../Flex.css";

const Cell = ({ cell, cellSelectedCallback }) => {
  function handleClick() {
    if (!cell.selected) {
      cellSelectedCallback(cell);
    }
  }

  function handleRightClick(event) {
    event.preventDefault();
  }

  let toDisplay = "";
  if (cell.selected) {
    toDisplay = cell.isMine ? "M" : cell.surroundingMines;
  }

  return (
    <div className="cell-container">
      <div
        className="cell flex-row flex-main-axis-center"
        onClick={handleClick}
        onContextMenu={e => handleRightClick(e)}
      >
        {toDisplay}
      </div>
    </div>
  );
};

export default Cell;
