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

  getRow(){
    return this.row;
  }

  getColumn(){
    return this.column;
  }

  setIsMine(isMine) {
    this.isMine = isMine;
  }

  getIsMine() {
    return this.isMine;
  }

  setSurroundingMines(surroundingMines) {
    this.surroundingMines = surroundingMines;
  }

  getSurroundingMines() {
    return this.surroundingMines;
  }

  getIsSelected(){
    return this.selected;
  }

  setIsSelected(selected){
    this.selected = selected;
  }
}
