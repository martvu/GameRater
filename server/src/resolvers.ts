import Game from '../models/game.js';
import Genre from '../models/genre.js';
import Platform from '../models/platform.js';
import Review from '../models/review.js';
import User from '../models/user.js';
import { Resolvers } from './__generated__/resolvers-types';

interface GameQueryFilters {
  platforms?: { $in: number[] };
  genres?: { $in: number[] };
  name?: { $regex: RegExp };
}

export const resolvers: Resolvers = {
  Query: {
    getGame: async (_, { ID }) => {
      return await Game.findById(ID);
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
      await Game.findByIdAndUpdate(gameID, {
        //Update the games user_rating
        user_rating: averageRating,
      });
      return averageRating;
    },
    getGenres: async (_, { limit }) => {
      const genres = await Genre.find().limit(limit);
      genres.sort((a, b) => a.name.localeCompare(b.name as string));
      return genres.map(genre => genre.toObject());
    },
    getPlatforms: async (_, { limit }) => {
      const platforms = await Platform.find().limit(limit);
      platforms.reverse();
      return platforms.map(platform => platform.toObject());
    },
    search: async (
      _,
      {
        userId,
        query,
        limit,
        offset,
        platforms,
        genres,
        sortBy,
        showFavorites,
        showReviewedGames,
      }
    ) => {
      const filters: GameQueryFilters = {};
      let distinctGenres: number[] = [];
      let distinctPlatforms: number[] = [];
      // Apply filters if provided
      if (query) {
        // Split the query into individual keywords
        const keywords = query.split(' ').filter(keyword => keyword.length > 0);
        // Create a regex pattern that matches documents containing all keywords
        const regexPattern = keywords
          .map(keyword => `(?=.*${keyword})`)
          .join('');
        filters.name = { $regex: new RegExp(regexPattern, 'i') };
        // Get distinct platforms and genres matching the query
        distinctPlatforms = await Game.distinct('platforms', filters).exec();
        distinctGenres = await Game.distinct('genres', filters).exec();
      }
      if (platforms && platforms.length > 0) {
        filters['platforms'] = { $in: platforms };
      }
      if (genres && genres.length > 0) {
        filters['genres'] = { $in: genres };
      }

      // If showFavorites is true, filter by user's favorite games
      let combinedGameIds = [];
      let hasFavoritesOrReviews = false;
      if (showFavorites && userId) {
        const user = await User.findOne({ _id: userId });
        if (user && user.favorites && user.favorites.length > 0) {
          combinedGameIds.push(...user.favorites);
          hasFavoritesOrReviews = true;
        }
      }
      // If showReviewedGames is true, filter by user's reviewed games
      if (showReviewedGames && userId) {
        const user = await User.findOne({ _id: userId });
        const reviews = await Review.find({ user: user.username });
        const reviewedGameIds = reviews.map(review => review.gameID);
        if (
          user &&
          user.reviews &&
          reviewedGameIds &&
          reviewedGameIds.length > 0
        ) {
          combinedGameIds.push(...reviewedGameIds);
          hasFavoritesOrReviews = true;
        }
      }
      // If user has favorites or reviews, filter by those
      if (hasFavoritesOrReviews) {
        // Remove duplicate IDs
        combinedGameIds = [...new Set(combinedGameIds)];
        if (combinedGameIds.length > 0) {
          filters['_id'] = { $in: combinedGameIds };
        }
        // Return no results if specifically requested data is not available
      } else if (showFavorites || showReviewedGames) {
        return { games: [], count: 0, filters: { platforms: [], genres: [] } };
      }

      try {
        let sortQuery = Game.find();
        // Apply sorting if sortBy is provided
        if (sortBy) {
          const { field, order } = sortBy;
          sortQuery = sortQuery
            .collation({ locale: 'en', strength: 1 })
            .sort({ [field]: order === 'asc' ? 1 : -1 });
        }
        // Execute the query with pagination to retrieve games
        const games = await sortQuery
          .find(filters)
          .skip(offset)
          .limit(limit)
          .exec();
        // Count the total number of games matching the query
        const count = await Game.find(filters).countDocuments().exec();

        return {
          games: games.map(game => game.toObject()),
          count,
          filters: {
            platforms: distinctPlatforms,
            genres: distinctGenres,
          },
        };
      } catch (error) {
        console.error(error);
        throw new Error('Error executing search query');
      }
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
        throw new Error('User not found');
      }
      return { ...review.toObject(), _id: review._id.toString() };
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
        throw new Error('User not found');
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
        throw new Error('User not found');
      }

      if (user.favorites.includes(gameID)) {
        user.favorites = user.favorites.filter(id => id !== gameID);
        await user.save();
      }
      return user.toObject();
    },
  },
  Game: {
    genres: async game => {
      return await Genre.find({ id: { $in: game.genres } });
    },
    platforms: async game => {
      return await Platform.find({ id: { $in: game.platforms } });
    },
    reviews: async (
      game,
      {
        limit,
        offset,
        username,
      }: { limit: number; offset: number; username: string }
    ) => {
      const reviews = await Review.find({ _id: { $in: game.reviews } })
        .skip(offset)
        .limit(limit);
      const count = await Review.countDocuments({ _id: { $in: game.reviews } });

      // Check if the user has written a review
      let userHasReviewed = false;
      if (username) {
        const userReview = await Review.findOne({
          gameID: game._id,
          user: username,
        });
        userHasReviewed = !!userReview;
      }

      return {
        reviews: reviews.map(review => ({
          ...review.toObject(),
          _id: review._id.toString(),
        })),
        count: count,
        userHasReviewed,
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
