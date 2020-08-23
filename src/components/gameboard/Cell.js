import React, { useState } from "react";
import "./Cell.css";
import "../Flex.css";

const Cell = ({ cell }) => {
  const [selected, setSelected] = useState(false);
  function handleClick() {
    if (!cell.getIsSelected()) {
      cell.setIsSelected(true);
      setSelected(true);
    }
  }

  let toDisplay = "";
  if (cell.getIsSelected()) {
    toDisplay = cell.getIsMine() ? "M" : cell.getSurroundingMines();
  }

  return (
    <div className="cell-container">
      <div
        className="cell flex-row flex-main-axis-center"
        onClick={handleClick}
      >
        {toDisplay}
      </div>
    </div>
  );
};

export default Cell;
