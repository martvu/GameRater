import { Schema, model } from 'mongoose';

interface IGame {
  id?: String,
  Title: String,
  summary: String,
  releaseDate: String,
  genres: [String],
}

const GameSchema = new Schema<IGame>({
  id: String,
  Title: { type: String, required: true },
  summary: { type: String, required: true },
  releaseDate: { type: String, required: true },
  genres: { type: [String], required: true }
});

const Game = model<IGame>('games', GameSchema);

export default Game;