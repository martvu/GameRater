import Game from '../models/game.js';
import Genre from '../models/genre.js';
import Platform from '../models/platform.js';
import Review from '../models/review.js';
import { Resolvers } from './__generated__/resolvers-types';

export const resolvers: Resolvers = {
  Query: {
    getGame: async (_, { ID }) => {
      return await Game.findById(ID);
    },
    getGames: async (_, { limit, offset }) => {
      const games = await Game.find().skip(offset).limit(limit);
      return {games: games.map(game => game.toObject()), count: await Game.countDocuments()};
    },
    getReview: async (_, { ID }) => {
      const review = await Review.findById(ID);
        return review.toObject();
    },
    getReviews: async (_, { limit }) => {
      const reviews = await Review.find().limit(limit);
      return reviews.map(review => review.toObject());
    },
    getAvgRating: async (_, { gameID }) => {
      const reviews = await Review.find({ gameID: gameID });
      if (reviews.length === 0) {
        return 0;
      }
      const totalRating = reviews.reduce((acc, review) => acc + review.rating.valueOf(), 0);
      const averageRating = Number((totalRating / reviews.length).toFixed(1));
      return averageRating;
    },

    getGenre: async (_, { id }) => {
      const genre = await Genre.findOne( { id: id });
      return genre.toObject();
    },

    getGenres: async (_, { limit }) => {
      const genres = await Genre.find().limit(limit);
      return genres.map(genre => genre.toObject());
    },
    getPlatform: async (_, { id }) => {
      const platform = await Platform.findOne( { id: id });
      return platform.toObject();
    },
    getPlatforms: async (_, { limit }) => {
      const platforms = await Platform.find().limit(limit);
      return platforms.map(platform => platform.toObject());
    },
  },
  Mutation: {
    createReview: async(_, { reviewInput: { author, title, content, rating, platform, gameID } }) => {
      const review = await new Review({
        author,
        title,
        content,
        rating,
        platform,
        gameID
      }).save();
      // Update the corresponding game's reviews array or create it if it doesn't exist
      await Game.findByIdAndUpdate(gameID, {
        $addToSet: { reviews: review._id },
      });
      return { ...review.toObject(), _id: review._id.toString() };
    },
    updateReview: async(
      _,
      { ID, reviewInput: { author, title, content, rating, platform, gameID } }
    ) => {
      await Review.updateOne(
        { _id: ID },
        { $set: { author, title, content, rating, platform, gameID } }
      );
      return ID;
    },
    deleteReview: async(_, { ID }) =>{
      await Review.deleteOne({ _id: ID });
      return ID;
    },
  },
  Game: {
    genres: async(game) =>{
      return await Genre.find({ id: { $in: game.genres } });
    },
    platforms: async(game) => {
      return await Platform.find({ id: { $in: game.platforms } });
    },
    reviews: async(game, { limit }: { limit: number }) => {
      const reviews = await Review.find({ _id: { $in: game.reviews} }).limit(limit);
      return reviews.map(review => ({ ...review.toObject(), _id: review._id.toString() }));
    }
  },
};
