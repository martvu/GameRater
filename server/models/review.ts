import { Schema, model } from "mongoose";

interface IReview {
  id?: String;
  user: String;
  title: String;
  content: String;
  rating: Number;
  platform: String;
  gameID: String;
}

const ReviewSchema = new Schema<IReview>({
  id: String,
  user: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, require: true },
  platform: { type: String, require: true },
  gameID: { type: String, require: true },
});

const Review = model<IReview>("reviews", ReviewSchema);

export default Review;
