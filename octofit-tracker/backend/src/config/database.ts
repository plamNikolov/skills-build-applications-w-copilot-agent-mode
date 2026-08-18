import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('✓ Connected to octofit_db');
    return true;
  } catch (error) {
    console.error('✗ Error connecting to octofit_db:', error);
    process.exit(1);
  }
};

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('disconnected', () => console.warn('MongoDB disconnected'));
db.on('reconnected', () => console.log('MongoDB reconnected'));

export default db;
