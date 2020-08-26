import React, { useMemo } from "react";
import "./Cell.css";
import "../Flex.css";

const Cell = ({ cell, leftClickCallback, rightClickCallBack }) => {
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

  const displayValue = useMemo(() => {
    if (!cell.selected) {
      if (cell.isFlagged) {
        return "F";
      } else {
        return "";
      }
    }

    if (cell.isMine) {
      return "M";
    }

    return cell.surroundingMines === 0 ? "" : cell.surroundingMines;
  }, [cell.selected, cell.isMine, cell.surroundingMines, cell.isFlagged]);

  const numberColourClassName = cell.isMine ? "" : `number-${cell.surroundingMines}`;

  function handleClick() {
    if (!cell.selected && !cell.isFlagged) {
      leftClickCallback(cell);
    }
  }

  function handleRightClick(event) {
    event.preventDefault();
    if (!cell.selected) {
      rightClickCallBack(cell);
    }
  }

  return (
    <div className="cell-container">
      <div
        style={borderStyle}
        className={`cell flex-row flex-main-axis-center noselect ${numberColourClassName}`}
        onClick={handleClick}
        onContextMenu={e => handleRightClick(e)}
      >
        {displayValue}
      </div>
    </div>
  );
};

export default Cell;
