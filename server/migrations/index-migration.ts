import Game from '../models/game.js';
import pkg from 'mongoose';
const { connect, connection } = pkg;
const MONGODB = "mongodb://it2810-48.idi.ntnu.no:27017/GameRater";
async function applyMigration() {
  try {
    // Connect to MongoDB
    await connect(MONGODB);
    console.log('Connected to MongoDB');

    // Create text index on the name field of the Game collection
    await Game.createIndexes({ name: 'text' });
    console.log('Text index created successfully');

  } catch (error) {
    console.error('Error applying migration:', error);
  } finally {
    // Close the MongoDB connection
    await connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the migration
applyMigration();
