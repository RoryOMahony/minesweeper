import React, { useMemo, useState } from "react";
import "./Cell.css";
import "../Flex.css";

const Cell = ({
  cell,
  cellSelectedCallBack,
  rightClickCallBack,
  doubleClickCallBack
}) => {
  const [selectingCell, setSelectingCell] = useState(false);

  const borderStyle = useMemo(() => {
    if (cell.selected || selectingCell) {
      return {
        borderStyle: "none"
      };
    } else {
      return {
        borderStyle: "outset"
      };
    }
  }, [cell.selected, selectingCell]);

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

  const numberColourClassName =
    cell.isMine || cell.isFlagged ? "" : `number-${cell.surroundingMines}`;

  function handleRightClick(event) {
    event.preventDefault();
  }

  function handleDoubleClick() {
    if (cell.selected && !cell.isMine) {
      doubleClickCallBack(cell);
    }
  }

  function handleMouseDown(event) {
    if (event.buttons === 1) {
      // Left click
      setSelectingCell(true);
    } else if (event.buttons === 2 && !cell.selected) {
      // Right click
      rightClickCallBack(cell);
    }
  }

  function handleMouseUp(event) {
    if (selectingCell && !cell.selected && !cell.isFlagged) {
      cellSelectedCallBack(cell);
    }
  }

  function handleMouseEnter(event) {
    if (event.buttons === 1 && !cell.isFlagged) {
      // Left click
      setSelectingCell(true);
    }
  }

  function handleMouseLeave() {
    setSelectingCell(false);
  }

  return (
    <div className="cell-container">
      <div
        style={borderStyle}
        className={`cell flex-row flex-main-axis-center noselect ${numberColourClassName}`}
        onMouseDown={e => handleMouseDown(e)}
        onMouseUp={e => handleMouseUp(e)}
        onMouseEnter={e => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
        onContextMenu={e => handleRightClick(e)}
      >
        {displayValue}
      </div>
    </div>
  );
};

export default Cell;
