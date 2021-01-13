import { Model } from 'mongoose';
import { Request, Response } from 'express';
import GameSchema, { gameProps } from '../Schemas/gameSchema';
import Result from '../Entity/Result';

const Game = new GameSchema();

class GameController {
  private game: Model<gameProps>;

  constructor() {
    this.game = Game.model;
  }

  async index(req: Request, res: Response) {
    const existGame = await this.game.findOne({
      roomName: String(req.query.name),
    });

    if (!existGame) {
      res.status(400).send({ error: 'room not exist' });
      return;
    }
    if (existGame.finished !== 0) {
      res.status(400).send({ error: 'room already finished' });
      return;
    }
    res.json({
      roomName: existGame.roomName,
      playerName: existGame.playerOneId,
      score: existGame.score,
      newPosition: true,
    });
  }

  async create(req: Request, res: Response) {
    const existGame = await this.game.findOne({ roomName: req.body.name });
    if (existGame) {
      res.status(400).send({ error: 'room already exist' });
      return;
    }
    const response = await this.game.create({ roomName: req.body.name });
    res.json({
      roomName: response.roomName,
      playerId: response.playerOneId,
      score: response.score,
      winner: response.winner,
      newPosition: true,
    });
  }

  async update(req: Request, res: Response) {
    const oldGame = await this.game.findOne({ roomName: req.body.name });
    if (!oldGame) {
      return;
    }
    const value = Game.setValue(
      req.body.position,
      oldGame.score,
      req.body.player
    );
    if (!value) {
      res.json({
        chara: oldGame?.playerOneId,
        score: oldGame?.score,
        newPosition: false,
      });
      return;
    }
    const verifyWin = Result.validateWin(req.body.player, value);
    const response = await Game.model.findOneAndUpdate(
      { roomName: req.body.name },
      { score: value, finished: verifyWin }
    );
    res.json({
      playerName: response?.playerOneId,
      score: response?.score,
      newPosition: req.body.position,
      finished: verifyWin,
    });
  }
}

export default new GameController();
