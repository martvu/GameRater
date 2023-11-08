import { Schema, model } from 'mongoose';

interface IPlatform {
  _id: Schema.Types.ObjectId;
  id: Number;
  name: String;
  alternative_name: String;
  slug: String;
  category: Number;
  created_at: Number;
  updated_at: Number;
  url: String;
  platform_logo: Number;
  versions: Number[];
  websites: Number[];
  checksum: String;
}

const PlatformSchema = new Schema<IPlatform>({
  _id: { type: Schema.Types.ObjectId, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  alternative_name: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: Number, required: true },
  created_at: { type: Number, required: true },
  updated_at: { type: Number, required: true },
  url: { type: String, required: true },
  platform_logo: { type: Number, required: true },
  versions: { type: [Number], required: true },
  websites: { type: [Number], required: true },
  checksum: { type: String, required: true },
});

const Platform = model<IPlatform>('platforms', PlatformSchema);

export default Platform;
