import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import GameCreator from "../../objects/GameCreator";
import "../Flex.css";

const GameBoard = ({ rows, columns, mines }) => {
  const [grid, setgrid] = useState("");

  useEffect(() => {
    function createGameBoard(numOfRows, numOfColumns, numOfMines) {
      const gameBoard = new GameCreator().createGame(
        numOfRows,
        numOfColumns,
        numOfMines
      );

      const gameCells = [];
      for (let i = 0; i < numOfRows; i++) {
        const row = createGameRow(i, numOfColumns, gameBoard);
        gameCells.push(row);
      }
      return gameCells;
    }

    function createGameRow(rowNum, numOfColumns, gameBoard) {
      const rowCells = [];
      for (let colNum = 0; colNum < numOfColumns; colNum++) {
        const cell = gameBoard.getCell(rowNum, colNum);
        rowCells.push(<Cell cell={cell} key={colNum}></Cell>);
      }
      return <div className="flex-row" key={rowNum}>{rowCells}</div>;
    }

    setgrid(createGameBoard(rows, columns, mines));
  }, [columns, mines, rows]);

  return <div>{grid}</div>;
};

export default GameBoard;
