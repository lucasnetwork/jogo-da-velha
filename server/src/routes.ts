import { Router } from 'express';
import Game from './utils/Game';

const routes = Router();

routes.get('/initGame', (req, res) => {
  const initGame = new Game('lucas');
  res.json({
    chara: initGame.playerOne,
    score: initGame.score,
  });
});

routes.post('/setValue', (req, res) => {
  const initGame = new Game('lucas');
  res.json({
    chara: initGame.playerOne,
    score: initGame.setValue('lucas', req.body.position),
  });
});

export default routes;
