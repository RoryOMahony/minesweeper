import React from "react";
import Cell from "./Cell";
import "../Flex.css";

const GameBoard = ({ rows, columns }) => {
  function createGameGrid(numOfRows, numOfColumns) {
    const gameCells = [];
    for (let i = 0; i < numOfRows; i++) {
      const row = createGameRow(numOfColumns);
      gameCells.push(row);
    }
    return gameCells;
  }

  function createGameRow(numOfColumns) {
    const rowCells = [];
    for (let j = 0; j < numOfColumns; j++) {
      rowCells.push(<Cell></Cell>);
    }
    return <div className="flex-row">{rowCells}</div>;
  }

  const grid = createGameGrid(rows, columns);

  return <div>{grid}</div>;
};

export default GameBoard;
