import Game from "../models/game.js";
import Genre from "../models/genre.js";
import Platform from "../models/platform.js";
import Review from "../models/review.js";
import User from "../models/user.js";
import { Resolvers } from "./__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_, { username }) => {
      return await User.findOne({ username: username });
    },
    getUsers: async (_, { limit }) => {
      const users = await User.find().limit(limit);
      return users.map((user) => user.toObject());
    },
    getReview: async (_, { ID }) => {
      const review = await Review.findById(ID);
      return review.toObject();
    },
    getReviews: async (_, { limit }) => {
      const reviews = await Review.find().limit(limit);
      return reviews.map((review) => review.toObject());
    },
    getGame: async (_, { ID }) => {
      return await Game.findById(ID);
    },
    getGames: async (_, { limit, offset, sortBy }) => {
      let query = Game.find();

      // Apply sorting if sortBy is provided
      if (sortBy) {
        const { field, order } = sortBy;
        query = query
          .collation({ locale: "en", strength: 1 })
          .sort({ [field]: order === "asc" ? 1 : -1 });
      }

      const count = await Game.countDocuments();
      const games = await query.skip(offset).limit(limit);

      return { games: games.map((game) => game.toObject()), count };
    },
    getAvgRating: async (_, { gameID }) => {
      const reviews = await Review.find({ gameID: gameID });
      if (reviews.length === 0) {
        return 0;
      }
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating.valueOf(),
        0
      );
      const averageRating = Number((totalRating / reviews.length).toFixed(1));
      return averageRating;
    },
    getGenre: async (_, { id }) => {
      const genre = await Genre.findOne({ id: id });
      return genre.toObject();
    },
    getGenres: async (_, { limit }) => {
      const genres = await Genre.find().limit(limit);
      return genres.map((genre) => genre.toObject());
    },
    getPlatform: async (_, { id }) => {
      const platform = await Platform.findOne({ id: id });
      return platform.toObject();
    },
    getPlatforms: async (_, { limit }) => {
      const platforms = await Platform.find().limit(limit);
      return platforms.map((platform) => platform.toObject());
    },
  },
  Mutation: {
    createReview: async (
      _,
      { reviewInput: { user, title, content, rating, platform, gameID } }
    ) => {
      const review = await new Review({
        user,
        title,
        content,
        rating,
        platform,
        gameID,
      }).save();
      
      
      const reviews = await Review.find({ gameID: gameID });

      // Calculate the new average rating
      let totalRating = reviews.reduce(
        (acc, review) => acc + review.rating.valueOf(),
        0
      );
      totalRating += rating; // Add the rating of the new review
      const newAverageRating = Number(
        (totalRating / (reviews.length + 1)).toFixed(1)
      );
      await Game.findByIdAndUpdate(gameID, {
        $addToSet: { reviews: review._id },
        //Update the games user_rating
        user_rating: newAverageRating,
      });

      const userDoc = await User.findOne({ username: user });
      if (userDoc) {
        await User.findByIdAndUpdate(userDoc._id, {
          $addToSet: { reviews: review._id },
        });
      } else {
        throw new Error("User not found");
      }
      return { ...review.toObject(), _id: review._id.toString() };
    },
    updateReview: async (
      _,
      { ID, reviewInput: { user, title, content, rating, platform, gameID } }
    ) => {
      await Review.updateOne(
        { _id: ID },
        { $set: { user, title, content, rating, platform, gameID } }
      );
      return ID;
    },
    deleteReview: async (_, { ID }) => {
      await Review.deleteOne({ _id: ID });
      await Game.updateOne({}, { $pull: { reviews: ID } });
      return ID;
    },
    signInOrCreateUser: async (_, { userInput: { username } }) => {
      const user = await User.findOne({ username: username });
      if (user) {
        return user.toObject();
      } else {
        const newUser = await new User({
          username,
        }).save();
        return newUser.toObject();
      }
    },
    addFavorites: async (_, { username, gameID }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }

      if (!user.favorites.includes(gameID)) {
        user.favorites.push(gameID);
        await user.save();
      }
      return user.toObject();
    },
    removeFavorites: async (_, { username, gameID }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }

      if (user.favorites.includes(gameID)) {
        user.favorites = user.favorites.filter((id) => id !== gameID);
        await user.save();
      }
      return user.toObject();
    },
  },
  Game: {
    genres: async (game) => {
      return await Genre.find({ id: { $in: game.genres } });
    },
    platforms: async (game) => {
      return await Platform.find({ id: { $in: game.platforms } });
    },
    reviews: async (
      game,
      { limit, offset }: { limit: number; offset: number }
    ) => {
      const reviews = await Review.find({ _id: { $in: game.reviews } })
        .skip(offset)
        .limit(limit);
      const count = await Review.countDocuments({ _id: { $in: game.reviews } });
      return {
        reviews: reviews.map((review) => ({
          ...review.toObject(),
          _id: review._id.toString(),
        })),
        count: count,
      };
    },
  },
  User: {
    async favorites(user) {
      return await Game.find({ _id: { $in: user.favorites } });
    },
    async reviews(user) {
      return await Review.find({ _id: { $in: user.reviews } });
    },
  },
};
