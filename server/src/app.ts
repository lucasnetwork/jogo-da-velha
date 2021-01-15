import express, { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';
import { Server as ServerSocket } from 'socket.io';
import routes from './routes';

import './config/dotEnv';
import './database/index';

class App {
  app: Express;

  server: Server;

  socketIo: ServerSocket;

  constructor() {
    this.app = express();
    this.server = new Server(this.app);
    this.middlewares();
    this.socketIo = new ServerSocket().listen(this.server, {
      cors: {
        origin: process.env.SOCKET_CLIENT,
      },
    });
    routes(this.socketIo);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }
}

export default new App();
