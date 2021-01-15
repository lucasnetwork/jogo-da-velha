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
    if (this.winAux) {
      return 0;
    }
    if (!existEmptyFields) {
      return 1;
    }
    return -1;
  }
}

export default new Result();
