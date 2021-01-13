import { Schema, model, Document, Model } from 'mongoose';

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
