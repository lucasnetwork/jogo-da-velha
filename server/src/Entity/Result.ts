import waysToWin from '../utils/waysToWin';

class Result {
  private winAux: null | boolean;

  constructor() {
    this.winAux = null;
  }

  validateWin(player: string, score: Array<string>) {
    const existEmptyFields = score.find((value) => value === '0');
    waysToWin.forEach((array) => {
      if (this.winAux) {
        return;
      }
      const winOrLose = score.every((value, index) => {
        if (array[index] === '0') {
          return true;
        }

        return value === player;
      });
      this.winAux = winOrLose || null;
    });
    if (this.winAux === false) {
      return 2;
    }
    if (this.winAux) {
      return 1;
    }
    if (this.winAux === null) {
      return 0;
    }
    if (!existEmptyFields) {
      return 3;
    }
    return 0;
  }
}

export default new Result();
