import { Schema, model } from "mongoose";

interface IReview {
  id?: String;
  author: String;
  title: String;
  content: String;
  rating: Number;
}

const ReviewSchema = new Schema<IReview>({
  id: String,
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, require: true },
});

const Review = model<IReview>("reviews", ReviewSchema);

export default Review;
