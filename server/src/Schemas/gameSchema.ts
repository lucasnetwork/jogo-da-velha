import { Schema, model, Document, Model } from 'mongoose';

export interface gameProps extends Document {
  roomName: string;
  score: Array<string>;
  playerOneId: string;
  playerTwoId: string;
  finished: number;
  turn: string;
  winner?: string;
}

class Game {
  private _model: Model<gameProps>;

  private newScore: Array<string>;

  constructor() {
    const schema = new Schema({
      roomName: String,
      score: [String],
      playerOneId: String,
      playerTwoId: String,
      finished: Number,
      turn: String,
      winner: String,
    });
    this.newScore = [];

    schema.pre<gameProps>('save', function (next): void {
      this.score = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
      this.winner = '0';
      this.finished = -1;
      next();
    });

    this._model = model<gameProps>('gameData', schema);
  }

  public get model(): Model<gameProps> {
    return this._model;
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
