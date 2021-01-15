import mongoose from 'mongoose';

class DB {
  mongoose = mongoose;

  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoose.connect(process.env.MONGO, { useUnifiedTopology: true });
  }
}

export default new DB();
