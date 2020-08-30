import React from "react";
import "../Flex.css";
import NumberDisplay from "./NumberDisplay";
import GameControl from "./GameControl";

const GameInfo = ({ game, gameDispatch }) => {
  return (
    <div className="flex-row flex-main-axis-space-between">
      <NumberDisplay number={game.flagsAvailable}></NumberDisplay>
      <GameControl
        gameState={game.gameState}
        gameDispatch={gameDispatch}
      ></GameControl>
      <NumberDisplay number={game.score}></NumberDisplay>
    </div>
  );
};

export default GameInfo;
