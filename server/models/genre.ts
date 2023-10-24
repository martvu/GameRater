import { Schema, model } from "mongoose";

interface IGenre {
  _id: Schema.Types.ObjectId;
  id: Number;
  name: String;
  slug: String;
  created_at: Number;
  updated_at: Number;
  url: String;
  checksum: String;
}

const GenreSchema = new Schema<IGenre>({
  _id: { type: Schema.Types.ObjectId, required: true},
  id: { type: Number, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  created_at: { type: Number, required: true },
  updated_at: { type: Number, required: true },
  url: { type: String, required: true },
  checksum: { type: String, required: true },
  });

const Genre = model<IGenre>("genres", GenreSchema);

export default Genre;
