export default class GameBoardObject {
  rowMap;

  constructor(rowMap) {
    this.rowMap = rowMap;
  }

  getCell(rowNum, columnNum) {
    const row = this.rowMap.get(rowNum);
    if (row === undefined) {
      return undefined;
    }
    return row.get(columnNum);
  }

  getRowCount() {
    return this.rowMap.size;
  }

  getColumnCount() {
    const rowCount = this.getRowCount();
    return rowCount === 0 ? 0 : this.rowMap.get(0).size;
  }

  getSurroundingCells(cellRowNum, cellColumnNum) {
    let rowToCheck = cellRowNum - 1;
    let columnToCheck = cellColumnNum - 1;

    const surroundingCells = [];

    for (let i = rowToCheck; i < rowToCheck + 3; i++) {
      for (let j = columnToCheck; j < columnToCheck + 3; j++) {
        addSurroundingCell(
          cellRowNum,
          cellColumnNum,
          i,
          j,
          surroundingCells,
          this
        );
      }
    }

    return surroundingCells;
  }
}

function addSurroundingCell(
  cellRowNum,
  cellColumnNum,
  rowToCheck,
  columnToCheck,
  surroundingCells,
  gameBoard
) {
  if (cellRowNum !== rowToCheck || cellColumnNum !== columnToCheck) {
    const cell = gameBoard.getCell(rowToCheck, columnToCheck);
    if (cell !== undefined) {
      surroundingCells.push(cell);
    }
  }
}
