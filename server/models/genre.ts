import { Schema, model, Document } from 'mongoose';

interface IGenre extends Document {
  _id: Schema.Types.ObjectId;
  id: Number;
  name: String;
}

const GenreSchema = new Schema<IGenre>({
  _id: { type: Schema.Types.ObjectId, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const Genre = model<IGenre>('genres', GenreSchema);

export default Genre;
