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
      for (let j = 0; j < numOfColumns; j++) {
        const cell = gameBoard.getCell(rowNum, j);
        rowCells.push(<Cell cell={cell}></Cell>);
      }
      return <div className="flex-row">{rowCells}</div>;
    }

    setgrid(createGameBoard(rows, columns, mines));
  }, [columns, mines, rows]);

  return <div>{grid}</div>;
};

export default GameBoard;
