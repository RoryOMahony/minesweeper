import React from "react";
import GameBoard from "./gameboard/GameBoard";
import "./Minesweeper.css";

export const Minesweeper = () => {
  return (
    <div id="game">
      <GameBoard rows={10} columns={10} mines={10}></GameBoard>
    </div>
  );
};
