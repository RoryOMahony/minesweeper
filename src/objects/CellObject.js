export default class CellObject {
  row;
  column;
  selected = false;
  isMine = false;
  surroundingMines;

  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

}
