import React from "react";
import GameGrid from "./gamegrid/GameGrid";
import "./Minesweeper.css";

export const Minesweeper = () => {
  return (
    <div id="game">
      <GameGrid rows={10} columns={10}></GameGrid>
    </div>
  );
};
