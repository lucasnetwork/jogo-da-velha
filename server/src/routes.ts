import { Router } from 'express';
import GameController from './controllers/gameController';

const routes = Router();

routes.get('/game', GameController.index);

routes.post('/game', GameController.create);

routes.put('/game', GameController.update);

export default routes;
