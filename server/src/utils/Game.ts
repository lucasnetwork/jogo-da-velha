import waysToWin from '../utils/waysToWin';

class Game {
  roomName: string;

  playerOne: 'x' | 'o';

  playerTwo: 'x' | 'o';

  score: Array<string>;

  private winAux: null | boolean;

  constructor(roomName: string, score?: [string]) {
    this.roomName = roomName;
    this.playerOne = 'x';
    this.playerTwo = 'o';
    this.score = score || ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
    this.winAux = null;
  }

  private verifyWin(player: string) {
    const existEmptyFields = this.score.find((value) => value === '0');
    waysToWin.forEach((array) => {
      if (this.winAux) {
        return;
      }
      const winOrLose = this.score.every((value, index) => {
        if (array[index] === '0') {
          return true;
        }

        return value === player;
      });
      this.winAux = winOrLose || null;
    });

    if (!existEmptyFields && !this.winAux) {
      return 'empate';
    }
    return 'venceu';
  }

  setValue(
    position: number
  ): { score: Array<string>; finished: string } | false {
    if (this.score[position] !== '0') {
      return false;
    }
    this.score[position] = this.playerOne;

    return { score: this.score, finished: this.verifyWin(this.playerOne) };
  }

  init() {
    return {
      roomName: this.roomName,
      playerOneId: 1,
      playerTwoId: 2,
      score: this.score,
    };
  }
}

export default Game;
