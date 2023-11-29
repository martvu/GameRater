import Game from '../models/game.js';
import Genre from '../models/genre.js';
import Platform from '../models/platform.js';
import Review from '../models/review.js';
import User from '../models/user.js';
import {
  InputMaybe,
  Resolvers,
  Scalars,
} from './__generated__/resolvers-types';

interface GameQueryFilters {
  platforms?: { $in: number[] };
  genres?: { $in: number[] };
  name?: { $regex: RegExp };
}

// Split query parsing into its own function
const parseQuery = (query: InputMaybe<Scalars['String']['input']>) => {
  const keywords = query.split(' ').filter(keyword => keyword.length > 0);
  const regexPattern = keywords.map(keyword => `(?=.*${keyword})`).join('');
  return { $regex: new RegExp(regexPattern, 'i') };
};

// Handle fetching of favorites and reviewed games
const fetchUserGameIds = async (
  userId: string,
  showFavorites: boolean,
  showReviewedGames: boolean
) => {
  const combinedGameIds = new Set();

  if (showFavorites) {
    const user = await User.findOne({ _id: userId });
    user.favorites.forEach(id => combinedGameIds.add(id));
  }

  if (showReviewedGames) {
    const reviews = await Review.find({ user: userId });
    reviews.forEach(review => combinedGameIds.add(review.gameID));
  }

  return Array.from(combinedGameIds);
};

function getGameFilters(
  query: InputMaybe<Scalars['String']['input']>,
  platforms: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>,
  genres: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
) {
  const filters: GameQueryFilters = {};
  if (query) {
    filters.name = parseQuery(query);
  }

  if (platforms && platforms.length > 0) {
    filters['platforms'] = { $in: platforms };
  }

  if (genres && genres.length > 0) {
    filters['genres'] = { $in: genres };
  }

  return filters;
}

export const resolvers: Resolvers = {
  Query: {
    getGame: async (_, { ID }) => {
      return await Game.findById(ID);
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
    getSearchSuggestions: async (_, { query }) => {
      const keywords = query.split(' ').filter(keyword => keyword.length > 0);
      const regexPattern = keywords.map(keyword => `(?=.*${keyword})`).join('');
      const filters = { name: { $regex: new RegExp(regexPattern, 'i') } };
      const games = await Game.find(filters).limit(5);
      return games.map(game => game.toObject());
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
      const filters: GameQueryFilters = getGameFilters(
        query,
        platforms,
        genres
      );

      if (showFavorites || showReviewedGames) {
        const gameIds = await fetchUserGameIds(
          userId,
          showFavorites,
          showReviewedGames
        );
        if (gameIds.length <= 0) {
          return {
            games: [],
            count: 0,
            filters: { platforms: [], genres: [] },
          };
        }
        filters['_id'] = { $in: gameIds };
      }

      try {
        const query = Game.find(filters);

        if (sortBy) {
          const { field, order } = sortBy;
          query
            .collation({ locale: 'en', strength: 1 })
            .sort({ [field]: order === 'asc' ? 1 : -1 });
        }
        const games = await query.skip(offset).limit(limit).exec();
        const count = await Game.find(filters).countDocuments().exec();

        return {
          games: games.map(game => game.toObject()),
          count,
          filters: {
            platforms: await Game.distinct('platforms', filters).exec(),
            genres: await Game.distinct('genres', filters).exec(),
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
      // Create the new review
      const newReview = new Review({
        user,
        title,
        content,
        rating,
        platform,
        gameID,
      });

      // Fetch all existing reviews for the game
      const existingReviews = await Review.find({ gameID: gameID });

      // Calculate the new average rating including the new review
      const totalRating =
        existingReviews.reduce(
          (acc, review) => acc + Number(review.rating),
          0
        ) + Number(newReview.rating);
      const newAverageRating = Number(
        (totalRating / (existingReviews.length + 1)).toFixed(1)
      );

      // Save the new review
      await newReview.save();
      await Game.findByIdAndUpdate(gameID, {
        $addToSet: { reviews: newReview._id },
        //Update the games user_rating and user_rating_count
        user_rating: newAverageRating,
        user_rating_count: existingReviews.length + 1,
      });

      // Add the review to the user's reviews
      const userDoc = await User.findOne({ username: user });
      if (userDoc) {
        await User.findByIdAndUpdate(userDoc._id, {
          $addToSet: { reviews: newReview._id },
        });
      } else {
        throw new Error('User not found');
      }
      return { ...newReview.toObject(), _id: newReview._id.toString() };
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
