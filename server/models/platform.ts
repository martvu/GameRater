import { Schema, model } from "mongoose";

interface IPlatform {
  id?: String;
  name: String;
  alternative_name: String;
  slug: String;
  category: String;
  created_at: String;
  updated_at: String;
  url: String;
  platform_logo: String;
  versions: String[];
  websites: String[];
  checksum: String;
}

const PlatformSchema = new Schema<IPlatform>(
  {
    id: String,
    name: { type: String, required: true },
    alternative_name: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    url: { type: String, required: true },
    platform_logo: { type: String, required: true },
    versions: { type: [String], required: true },
    websites: { type: [String], required: true },
    checksum: { type: String, required: true },
  },
  {
    collection: "platform", // Specify the collection name explicitly
  }
);

const Platform = model<IPlatform>("platform", PlatformSchema);

export default Platform;
