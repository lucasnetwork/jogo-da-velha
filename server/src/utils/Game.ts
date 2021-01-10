class Game {
  roomName: string;

  playerOne: 'x' | 'o';

  playerTwo: 'x' | 'o';

  score: Array<string>;

  constructor(roomName: string, score?: [string]) {
    this.roomName = roomName;
    this.playerOne = 'x';
    this.playerTwo = 'o';
    this.score = score || ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
  }

  setValue(position: number) {
    if (this.score[position] !== '0') {
      return false;
    }
    this.score[position] = this.playerOne;
    return this.score;
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
