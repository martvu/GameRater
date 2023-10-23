import { Schema, model } from "mongoose";

interface IGame {
  id?: String;
  name: String;
  summary: String;
  first_release_date: String;
  cover_image_id: String;
}

const GameSchema = new Schema<IGame>(
  {
    id: String,
    name: { type: String, required: true },
    summary: { type: String, required: true },
    first_release_date: { type: String, required: true },
    cover_image_id: { type: String, required: true },
  },
  {
    collection: "igdb", // Specify the collection name explicitly
  }
);

const Game = model<IGame>("igdb", GameSchema);

export default Game;
