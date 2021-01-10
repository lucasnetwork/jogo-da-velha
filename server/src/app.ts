import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

class App {
  server: Express;

  constructor() {
    mongoose.connect('', { useUnifiedTopology: true });
    this.server = express();
    this.middlewares();
    this.route();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  route() {
    this.server.use(routes);
  }
}

export default new App().server;
