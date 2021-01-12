import { Schema, model, Document, Model } from 'mongoose';
import waysToWin from '../utils/waysToWin';

interface gameProps extends Document {
  roomName: string;
  score: Array<string>;
  playerOneId: number;
  playerTwoId: number;
  finished: number;
  winner?: number;
}

class Game {
  private _model: Model<gameProps>;

  private newScore: Array<string>;

  private winAux: null | boolean;

  constructor() {
    const schema = new Schema({
      roomName: String,
      score: [String],
      playerOneId: Number,
      playerTwoId: Number,
      finished: Number,
      winner: Number,
    });
    this.newScore = [];
    this.winAux = null;

    schema.pre<gameProps>('save', function (next): void {
      this.score = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
      this.winner = 0;
      next();
    });

    this._model = model<gameProps>('Game', schema);
  }

  public get model(): Model<gameProps> {
    return this._model;
  }

  verifyWin(player: string, score: Array<string>) {
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

  setValue(
    position: number,
    score: Array<string>,
    player: string
  ): Array<string> | false {
    this.newScore = score;
    if (score[position] !== '0') {
      return false;
    }
    this.newScore[position] = player;

    return this.newScore;
  }
}
export default Game;
