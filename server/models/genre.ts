import { Schema, model } from "mongoose";

interface IGenre {
  id?: String;
  name: String;
  slug: String;
  created_at: String;
  updated_at: String;
  url: String;
  checksum: String;
}

const GenreSchema = new Schema<IGenre>(
  {
    id: String,
    name: { type: String, required: true },
    slug: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    url: { type: String, required: true },
    checksum: { type: String, required: true },
  },
  {
    collection: "genres", // Specify the collection name explicitly
  }
);

const Genre = model<IGenre>("genre", GenreSchema);

export default Genre;
