import React, { useMemo } from "react";
import "./Cell.css";
import "../Flex.css";

const Cell = ({ cell, cellSelectedCallback }) => {
  const borderStyle = useMemo(() => {
    if (cell.selected) {
      return {
        borderStyle: "none"
      };
    } else {
      return {
        borderStyle: "outset"
      };
    }
  }, [cell.selected]);
  useMemo(() => {}, []);

  const displayValue = useMemo(() => {
    if (!cell.selected || cell.surroundingMines === 0) {
      return "";
    }
    if (cell.isMine) {
      return "M";
    }
    return cell.surroundingMines;
  }, [cell.selected, cell.isMine, cell.surroundingMines]);

  function handleClick() {
    if (!cell.selected) {
      cellSelectedCallback(cell);
    }
  }

  function handleRightClick(event) {
    event.preventDefault();
  }

  return (
    <div className="cell-container">
      <div
        style={borderStyle}
        className="cell flex-row flex-main-axis-center"
        onClick={handleClick}
        onContextMenu={e => handleRightClick(e)}
      >
        {displayValue}
      </div>
    </div>
  );
};

export default Cell;
