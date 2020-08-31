import React, { useState, useCallback } from "react";
import { CustomDifficultyModal } from "./CustomDifficultyModal";

export const CustomDifficulty = ({ gameDispatch }) => {
  const [show, setShow] = useState(false);

  const hideModalCallback = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <div>
      <button onClick={() => setShow(true)}>Custom</button>
      {show && (
        <CustomDifficultyModal
          gameDispatch={gameDispatch}
          hideModalCallback={hideModalCallback}
        ></CustomDifficultyModal>
      )}
    </div>
  );
};
