import React from "react";
import "../gameboard/Cell.css";
import "../Flex.css";
import { GAME_STATE } from "../../objects/GameState";
import { BOARD_REDUCER_ACTIONS } from "../../reducers/GameReducer";

const GameControl = ({ gameState, gameDispatch }) => {
  function handleClick() {
    gameDispatch({
      type: BOARD_REDUCER_ACTIONS.RESET_GAME
    });
  }

  function calculateDisplayStyle() {
    if (gameState === GAME_STATE.LOST) {
      return "fa-frown-o";
    }
    if (gameState === GAME_STATE.WON) {
      return "fa-trophy";
    }
    return "fa-smile-o";
  }

  const iconToDisplayStyle = calculateDisplayStyle();

  return (
    <div className="flex-row flex-main-axis-center flex-cross-axis-center">
      <div className="cell-container" onClick={handleClick}>
        <div className="cell game-control flex-row flex-main-axis-center flex-cross-axis-center noselect">
          <i className={`fa ${iconToDisplayStyle}`} aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default GameControl;
