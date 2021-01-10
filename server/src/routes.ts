import { Router } from 'express';
import Game from './utils/Game';
import GameSchema from './Schemas/gameSchema';

const routes = Router();

routes.post('/initGame', async (req, res) => {
  const existGame = await GameSchema.findOne({ roomName: req.body.name });
  console.log(existGame);
  if (existGame) {
    res.json({
      chara: existGame.playerOne,
      score: existGame.score,
      newPosition: true,
    });
    return;
  }
  const initGame = new Game('lucas');
  const responst = await GameSchema.create(initGame.init());
  res.json({
    chara: responst.playerOne,
    score: responst.score,
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
    { score: value },
  );
  res.json({
    chara: response?.playerOne,
    score: response?.score,
    newPosition: req.body.position,
  });
});

export default routes;
