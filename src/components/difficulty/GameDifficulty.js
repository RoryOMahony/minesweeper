import React from "react";
import { BOARD_REDUCER_ACTIONS } from "../../reducers/GameReducer";

export const GameDifficulty = ({ difficultyInfo, gameDispatch }) => {
  function handleClick() {
    gameDispatch({
      type: BOARD_REDUCER_ACTIONS.CHANGE_DIFFICULTY,
      payload: difficultyInfo
    });
  }

  return (
    <div>
      <button onClick={handleClick}>{difficultyInfo.title}</button>
    </div>
  );
};
