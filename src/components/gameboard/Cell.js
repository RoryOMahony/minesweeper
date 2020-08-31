import React, { useState } from "react";
import "./Cell.css";
import "../Flex.css";

const Cell = ({
  cell,
  gameOver,
  cellSelectedCallBack,
  rightClickCallBack,
  doubleClickCallBack
}) => {
  const [selectingCell, setSelectingCell] = useState(false);

  const calculateBorderStyle = () => {
    if (!cell.display && selectingCell) {
      return {
        borderStyle: "none"
      };
    }

    if (cell.display) {
      if (!cell.isMine || !cell.selected) {
        return {
          borderStyle: "none"
        };
      }

      return {
        borderStyle: "none",
        backgroundColor: "red"
      };
    }

    return {
      borderStyle: "outset"
    };
  };

  const calculateDisplayValue = () => {
    if (!cell.display) {
      if (cell.isFlagged) {
        return <i className="fa fa-flag cell-icon" aria-hidden="true"></i>;
      } else {
        return "";
      }
    }

    if (cell.isMine) {
      return <i className="fa fa-bomb cell-icon" aria-hidden="true"></i>;
    }

    return cell.surroundingMines === 0 ? "" : cell.surroundingMines;
  };

  const borderStyle = calculateBorderStyle();
  const displayValue = calculateDisplayValue();

  const numberColourClassName =
    cell.isMine || cell.isFlagged ? "" : `number-${cell.surroundingMines}`;

  function handleRightClick(event) {
    event.preventDefault();
  }

  function handleDoubleClick() {
    if (!gameOver && cell.display && !cell.isMine) {
      doubleClickCallBack(cell);
    }
  }

  function handleMouseDown(event) {
    if (gameOver) {
      return;
    }

    if (event.buttons === 1 && !cell.isFlagged) {
      // Left click
      setSelectingCell(true);
    } else if (event.buttons === 2 && !cell.display) {
      // Right click
      rightClickCallBack(cell);
    }
  }

  function handleMouseUp() {
    if (selectingCell && !cell.display && !cell.isFlagged) {
      cellSelectedCallBack(cell);
    }
  }

  function handleMouseEnter(event) {
    if (gameOver) {
      return;
    }
    if (event.buttons === 1 && !cell.isFlagged) {
      // Left click
      setSelectingCell(true);
    }
  }

  function handleMouseLeave() {
    setSelectingCell(false);
  }

  return (
    <div className="cell-container" onContextMenu={e => handleRightClick(e)}>
      <div
        style={borderStyle}
        className={`cell flex-row flex-main-axis-center flex-cross-axis-center noselect ${numberColourClassName}`}
        onMouseDown={e => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseEnter={e => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
      >
        {displayValue}
      </div>
    </div>
  );
};

export default Cell;
