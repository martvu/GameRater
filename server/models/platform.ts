import { Schema, model, Document } from 'mongoose';

interface IPlatform extends Document {
  _id: Schema.Types.ObjectId;
  id: Number;
  name: String;
}

const PlatformSchema = new Schema<IPlatform>({
  _id: { type: Schema.Types.ObjectId, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const Platform = model<IPlatform>('platforms', PlatformSchema);

export default Platform;
