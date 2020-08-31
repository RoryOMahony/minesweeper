import React, { useState } from "react";
import { BOARD_REDUCER_ACTIONS } from "../../reducers/GameReducer";
import { DIFFICULTIES } from "./Difficulties";
import "./CustomDifficultyModal.css";

export const CustomDifficultyModal = ({ gameDispatch, hideModalCallback }) => {
  const [rows, setRows] = useState(DIFFICULTIES.BEGINNER.rows);
  const [columns, setColumns] = useState(DIFFICULTIES.BEGINNER.columns);
  const [mines, setMines] = useState(DIFFICULTIES.BEGINNER.mines);

  function setInput(input, setterFunction) {
    if (isNaN(input)) {
      return;
    }

    const int = parseInt(input);
    if (int <= 0) {
      return;
    }
    setterFunction(int);
  }

  function handleCancel() {
    hideModalCallback();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cells = rows * columns;
    if (mines >= cells) {
      return;
    }

    gameDispatch({
      type: BOARD_REDUCER_ACTIONS.CHANGE_DIFFICULTY,
      payload: {
        rows: rows,
        columns: columns,
        mines: mines
      }
    });
    hideModalCallback();
  }

  return (
    <div className="modal">
      <div className="modal-content custom-difficulty-modal">
        <form onSubmit={handleSubmit}>
          <div className="custom-difficulty-form-row">
            <label htmlFor="rows">Rows</label>
            <input
              type="number"
              name="rows"
              defaultValue={rows}
              onChange={e => setInput(e.target.value, value => setRows(value))}
            />
          </div>
          <div className="custom-difficulty-form-row">
            <label htmlFor="columns">Columns</label>
            <input
              type="number"
              name="columns"
              defaultValue={columns}
              onChange={e =>
                setInput(e.target.value, value => setColumns(value))
              }
            />
          </div>
          <div className="custom-difficulty-form-row">
            <label htmlFor="mines">Mines</label>
            <input
              type="number"
              name="mines"
              defaultValue={mines}
              onChange={e => setInput(e.target.value, value => setMines(value))}
            />
          </div>
          <div className="custom-difficulty-form-controls">
            <button
              className="custom-difficulty-form-control"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <input
              className="custom-difficulty-form-control"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
