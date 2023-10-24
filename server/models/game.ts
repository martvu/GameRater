import { Schema, model } from "mongoose";

interface IGame {
  _id: Schema.Types.ObjectId;
  id: Number;
  name: String;
  summary: String;
  genres: Number[];
  platforms: Number[];
  first_release_date: String;
  cover_image_id: String;
}

const GameSchema = new Schema<IGame>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    genres: { type: [Number], required: true },
    platforms: { type: [Number], required: true },
    first_release_date: { type: String, required: true },
    cover_image_id: { type: String, required: true },
  },
  {
    collection: "igdb", // Specify the collection name explicitly
  }
);

const Game = model<IGame>("igdb", GameSchema);

export default Game;
