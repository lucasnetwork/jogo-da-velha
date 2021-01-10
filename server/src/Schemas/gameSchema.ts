import { Schema, model } from 'mongoose';

const gameSchema = new Schema({
  roomName: String,
  score: [String],
  playerOneId: Number,
  playerTwoId: Number,
});

export default model('game', gameSchema);
