import { Schema, model } from 'mongoose';

interface IGames {
  id?: String,
  Title: String,
  summary: String,
  releaseDate: String,
  genres: [String],
}

const GameSchema = new Schema<IGames>({
  id: String,
  Title: { type: String, required: true },
  summary: { type: String, required: true },
  releaseDate: { type: String, required: true },
  genres: { type: [String], required: true }
});

const Game = model<IGames>('games', GameSchema);

export default Game;