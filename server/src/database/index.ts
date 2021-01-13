import mongoose from 'mongoose';

class DB {
  mongoose = mongoose;

  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoose.connect('', { useUnifiedTopology: true });
  }
}

export default new DB();
