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

export default routes;
