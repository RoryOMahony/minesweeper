export default class CellObject {
  row;
  column;
  selected = false;
  isMine = false;
  isFlagged = false;
  surroundingMines;

  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}
