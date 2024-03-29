import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: String;
  favorites: String[];
  reviews: String[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  favorites: { type: [String], required: true },
  reviews: { type: [String], required: true },
});

const User = model<IUser>('users', UserSchema);

export default User;
