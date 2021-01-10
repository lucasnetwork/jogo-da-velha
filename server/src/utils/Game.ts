class Game {
  roomName: string;

  playerOne: 'x' | 'o';

  playerTwo: 'x' | 'o';

  score: Array<string>;

  constructor(roomName: string) {
    this.roomName = roomName;
    this.playerOne = 'x';
    this.playerTwo = 'o';
    this.score = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
  }

  setValue(name: string, position: number) {
    if (this.score[position] !== '0') {
      return false;
    }
    this.score[position] = name;
    return this.score;
  }
}

export default Game;
