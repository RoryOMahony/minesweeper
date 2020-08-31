import React from "react";
import "../Flex.css";
import NumberDisplay from "./NumberDisplay";
import GameControl from "./GameControl";

const GameInfo = ({ game, gameDispatch }) => {
  return (
    <div className="flex-row flex-main-axis-space-between">
      <NumberDisplay
        number={game.flagsAvailable}
        displayStyle="number-display-left-container"
      ></NumberDisplay>
      <GameControl
        gameState={game.gameState}
        gameDispatch={gameDispatch}
      ></GameControl>
      <NumberDisplay
        number={game.score}
        displayStyle="number-display-right-container"
      ></NumberDisplay>
    </div>
  );
};

export default GameInfo;
