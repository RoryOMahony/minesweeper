import React from "react";
import "../gameboard/Cell.css";
import { GAME_STATE } from "../../objects/GameState";
import { BOARD_REDUCER_ACTIONS } from "../../reducers/GameReducer";

const GameControl = ({ gameState, gameDispatch }) => {
  function handleClick() {
    gameDispatch({
      type: BOARD_REDUCER_ACTIONS.RESET_GAME
    });
  }

  const iconToDisplayStyle =
    gameState === GAME_STATE.LOST ? "fa-frown-o" : "fa-smile-o";

  return (
    <div className="cell-container" onClick={handleClick}>
      <div className="cell game-control flex-row flex-main-axis-center flex-cross-axis-center noselect">
        <i className={`fa ${iconToDisplayStyle}`} aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default GameControl;
