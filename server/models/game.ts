import { Schema, model, Document } from 'mongoose';

interface IGame extends Document {
  _id: Schema.Types.ObjectId;
  id: Number;
  name: String;
  summary?: String;
  genres: Number[];
  platforms: Number[];
  first_release_date: String;
  cover_image_id?: String;
  reviews?: String[];
  aggregated_rating?: Number;
  aggregated_rating_count?: Number;
  user_rating?: Number;
  user_rating_count?: Number;
}

const GameSchema = new Schema<IGame>({
  _id: { type: Schema.Types.ObjectId, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  summary: { type: String, required: false },
  genres: { type: [Number], required: true },
  platforms: { type: [Number], required: true },
  first_release_date: { type: String, required: true },
  cover_image_id: { type: String, required: false },
  reviews: { type: [String], required: false },
  aggregated_rating: { type: Number, required: false },
  aggregated_rating_count: { type: Number, required: false },
  user_rating: { type: Number, required: false },
  user_rating_count: { type: Number, required: false },
});

const Game = model<IGame>('games', GameSchema);

export default Game;
