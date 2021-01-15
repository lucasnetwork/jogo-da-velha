import { Server } from 'socket.io';
import GameController from './controllers/gameController';

const socketRoutes = (socket: Server) => {
  socket.on('connection', (connection: Server) => {
    connection.on('continueGame', async (name, namePlayer) => {
      const value = await GameController.index(name, namePlayer);
      socket.emit('valueGame', value);
    });
    connection.on('initGame', async (name: any) => {
      const value = await GameController.create(name);
      socket.emit('valueGame', value);
    });
    connection.on(
      'setValue',
      async (name: string, position: number, namePlayer: string) => {
        const value = await GameController.update(name, position, namePlayer);
        if (!value) {
          return false;
        }
        socket.emit('valueGame', value);
      }
    );
  });
};

export default socketRoutes;
