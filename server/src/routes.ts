import { Router } from 'express';
import Game from './utils/Game';
import GameSchema from './Schemas/gameSchema';

const routes = Router();

routes.post('/initGame', async (req, res) => {
  const existGame = await GameSchema.findOne({ roomName: req.body.name });
  if (existGame) {
    res.status(400).send({ error: 'room already exist' });
    return;
  }
  const initGame = new Game(req.body.name);
  const respons = await GameSchema.create(initGame.init());
  res.json({
    roomName: respons.roomName,
    playerId: respons.playerOneId,
    score: respons.score,
    newPosition: true,
  });
});

routes.post('/continue', async (req, res) => {
  const existGame = await GameSchema.findOne({ roomName: req.body.name });
  if (!existGame) {
    res.status(400).send({ error: 'room not exist' });
    return;
  }
  res.json({
    roomName: existGame.roomName,
    playerName: existGame.playerOne,
    score: existGame.score,
    newPosition: true,
  });
});

routes.post('/setValue', async (req, res) => {
  const oldGame = await GameSchema.findOne({ roomName: req.body.name });
  const game = new Game(req.body.name, oldGame?.score);
  const value = game.setValue(req.body.position);
  if (!value) {
    res.json({
      chara: oldGame?.playerOne,
      score: oldGame?.score,
      newPosition: false,
    });
    return;
  }
  const response = await GameSchema.findOneAndUpdate(
    { roomName: req.body.name },
    { score: value.score },
  );
  res.json({
    playerName: response?.playerOne,
    score: response?.score,
    newPosition: req.body.position,
    finished: value.finished,
  });
});

export default routes;
