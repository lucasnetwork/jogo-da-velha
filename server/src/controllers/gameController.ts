import GameSchema from '../Schemas/gameSchema';
import Result from '../Entity/Result';

const game = new GameSchema();

class GameController {
  public async index(name: any, namePlayer: string) {
    const existGame = await game.model.findOne({
      roomName: name,
    });

    if (!existGame) {
      return;
    }
    if (!namePlayer) {
      await existGame.updateOne({ playerTwoId: 'o' });
      return {
        roomName: existGame.roomName,
        playerName: 'o',
        score: existGame.score,
        winner: '0',
        newPosition: -1,
        turn: existGame.turn,
      };
    }
    if (existGame.finished > -1) {
      return;
    }
    return {
      roomName: existGame.roomName,
      score: existGame.score,
      newPosition: -1,
      turn: existGame.turn,
      winner: '0',
    };
  }

  async create(name: any) {
    const existGame = await game.model.findOne({ roomName: name });
    if (existGame) {
      return;
    }
    const response = await game.model.create({
      roomName: name,
      playerOneId: 'x',
      turn: 'x',
    });
    return {
      roomName: response.roomName,
      playerName: response.playerOneId,
      score: response.score,
      winner: '0',
      newPosition: -2,
      turn: response.turn,
    };
  }

  async update(name: string, position: number, namePlayer: string) {
    const oldGame = await game.model.findOne({ roomName: name });
    if (!oldGame) {
      return;
    }
    const { turn } = oldGame;

    const newScore = game.setValue(position, oldGame.score, namePlayer);
    if (!newScore) {
      return {
        playerName: oldGame?.playerOneId,
        score: oldGame?.score,
      };
    }
    const verifyWin = Result.validateWin(namePlayer, newScore);
    let winner;
    if (verifyWin === 0) {
      winner = namePlayer;
    } else if (verifyWin === 1) {
      winner = 'empate';
    } else {
      winner = '0';
    }
    try {
      await oldGame.updateOne({
        score: newScore,
        finished: verifyWin,
        turn: oldGame.turn === 'x' ? 'o' : 'x',
        winner,
      });
    } catch {
      return;
    }
    return {
      roomName: oldGame.roomName,
      playerName: namePlayer,
      score: newScore,
      newPosition: position,
      finished: verifyWin,
      turn: turn === 'x' ? 'o' : 'x',
      winner,
    };
  }
}

export default new GameController();
