import { NUM_ROWS, NUM_COLS } from '../constants.js';
import { getRandomInt } from '../utils/math-utils.js';
import ReactionTimerGridView from './ReactionTimerGridView.js';

class ReactionTimerGame {
  constructor() {
    this.view = null;
    this.activeCellRow = null;
    this.activeCellCol = null; 
    this.activeCells = []; // アクティブセル行列ごとに、配列で持つ
    this.useCellNum = 2; // 光らせるセルの数
    this.clickNum = 0; // クリックした回数（1個目と2個目の区別）
    this.currentStartTime = null;
    this.currentEndTime = null;
  }

  handleRoundStart() {
    const delay = getRandomInt(500, 3000);
    setTimeout(this.startCycle.bind(this), delay);
  }

  startCycle() {
    this.currentStartTime = new Date().getTime(); // milliseconds
    // this.view.deactivateCell(this.activeCellRow, this.activeCellCol);
    while (this.activeCells.length > 0) {
      const activeCell = this.activeCells.shift()
      this.view.deactivateCell(activeCell[0], activeCell[1]);
    }
    // this.triggerRandomCell();
    for (let j = 0; j < this.useCellNum; j++) this.triggerRandomCell()
  }

  triggerRandomCell() {
    const randomRowIndex = getRandomInt(0, NUM_ROWS);
    const randomColIndex = getRandomInt(0, NUM_COLS);
    // this.activeCellRow = randomRowIndex; 
    // this.activeCellCol = randomColIndex;
    // 生成したセル位置は複数あるため、行列セットで格納しておく
    this.activeCells.push([randomRowIndex,randomColIndex])
    this.view.activateCell(randomRowIndex, randomColIndex);
  }

  //handleActiveCellSelected() {
  handleActiveCellSelected(activeCellPosition) {
    this.clickNum ++; // クリックした回数を増やして2回目と識別する
    //  this.view.deactivateCell(this.activeCellRow, this.activeCellCol);
    // 引きついてきたアクティブセル位置（'row',':','col'）を利用して指定する
    this.view.deactivateCell(activeCellPosition[0], activeCellPosition[2]); 
    this.calculateTime();
    if (this.clickNum === 2) this.clickNum = 0 // 2回表示したら、クリック回数を元に戻す
  }

  calculateTime() {
    this.currentEndTime = new Date().getTime();
    //console.log(this.currentEndTime - this.currentStartTime);
    // 〇個目のクリックに応じてconsole表示内容を変える
    const scoreTime = this.currentEndTime - this.currentStartTime;
    switch (this.clickNum) {
      case 1: 
        console.log(`1st reaction: ${scoreTime}`);
        break;
      case 2:
        console.log(`2nd reaction: ${scoreTime}\n---`);
        break;
      // 1と2以外は来ないはずなので、エラー処理を入れる
      default:
        console.log(`error`);
        break;
    }
  }

  init() {
    this.view = new ReactionTimerGridView();
    
    this.view.registerActiveCellSelectedCallback(this.handleActiveCellSelected.bind(this));
    this.view.registerRoundStartCallback(this.handleRoundStart.bind(this));
    this.view.initDomAndListeners();
    this.view.drawGrid();
  }
}

export default ReactionTimerGame;
