import { NUM_ROWS, NUM_COLS } from '../constants.js';

class ReactionTimerGridView {
  constructor() {
    this.activeCellEl = null;
    this.activeCellClickHandler = this.handleActiveCellClick.bind(this);
    this.callbacks = {};
  }

  initDomAndListeners() {
    document.querySelector('.btn-start')
      .addEventListener('click', this.handleBtnStart.bind(this));
  }

  registerActiveCellSelectedCallback(callback) {
    this.callbacks.handleActiveCellSelected = callback;
  }

  registerRoundStartCallback(callback) {
    this.callbacks.handleRoundStartCallback = callback;
  }

  handleBtnStart() {
    this.callbacks.handleRoundStartCallback();
  }

  getCellId(row, col) {
    return `${row}:${col}`;
  }

  drawGrid() {
    const grid = document.querySelector('#container .grid');

    for (let row = 0; row < NUM_ROWS; row += 1) {
      const rowEl = document.createElement('TR');
      for (let col = 0; col < NUM_COLS; col += 1) {
        const cellEl = document.createElement('TD');
        const position = this.getCellId(row, col);
        cellEl.id = position;
        rowEl.appendChild(cellEl);
      }
      grid.appendChild(rowEl);
    }
  }

  getCellByPosition(rowIndex, colIndex) {
    const cellKey = this.getCellId(rowIndex, colIndex);
    return document.getElementById(cellKey);
  }

  activateCell(rowIndex, colIndex) {
    const cellEl = this.getCellByPosition(rowIndex, colIndex);
    cellEl.className = 'cell-active';
    cellEl.addEventListener('click', this.activeCellClickHandler);
  }

  deactivateCell(rowIndex, colIndex) {
    const cellEl = this.getCellByPosition(rowIndex, colIndex);
    if (cellEl) {
      cellEl.className = '';
      cellEl.removeEventListener('click', this.activeCellClickHandler);
    }
  }

  handleActiveCellClick(event) {
    // クリックしたセルのエレメント（ID）を取得し、次処理の引数として渡す
    const activeCellPosition = event.target.id;
    // this.callbacks.handleActiveCellSelected();
    this.callbacks.handleActiveCellSelected(activeCellPosition);
  }
}

export default ReactionTimerGridView;
