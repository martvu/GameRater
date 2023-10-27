import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import Review from "../models/review.js";
import Game from "../models/game.js";
import Genre from "../models/genre.js";
import Platform from "../models/platform.js";
import User from "../models/user.js";

const MONGODB = "mongodb://it2810-48.idi.ntnu.no:27017/GameRater";

const typeDefs = `#graphql
  type Review {
    _id: String
    user: User
    title: String
    content: String
    rating: Int
    platform: String
    gameID: String
  }

  type User {
    _id: String
    username: String
    favorites: [Game]
    reviews: [Review]
  }

  type Game {
    _id: String
    id: Int
    name: String
    summary: String
    genres: [Genre]
    platforms: [Platform]
    first_release_date: String
    cover_image_id: String
    reviews(limit: Int): [Review]
  }

  type Genre {
    _id: String
    id: Int
    name: String
    slug: String
    created_at: Int
    updated_at: Int
    url: String
    checksum: String
  }

  type Platform {
    _id: String
    id: Int
    name: String
    alternative_name: String
    slug: String
    category: Int
    created_at: Int
    updated_at: Int
    url: String
    platform_logo: Int
    versions: [Int]
    websites: [Int]
    checksum: String
  }

  input ReviewInput {
    user: String
    title: String
    content: String
    rating: Int
    platform: String
    gameID: String
  }

  input UserInput {
    username: String
  }

  type Query {
    getReview(ID: ID!): Review!
    getReviews(limit: Int): [Review!]!
    getUser(username: String!): User!
    getUsers(limit: Int): [User!]!
    getGame(ID: ID!): Game!
    getGames(limit: Int, offset: Int): [Game!]!
    getGenre(id: Int): Genre!
    getGenres(limit: Int): [Genre!]!
    getPlatform(id: Int): Platform!
    getPlatforms(limit: Int): [Platform!]!
  }

  type Mutation {
    createReview(reviewInput: ReviewInput): Review!
    updateReview(ID: ID!, reviewInput: ReviewInput): String!
    deleteReview(ID: ID!): String!
    createUser(userInput: UserInput): User!
  }
  `;

const resolvers = {
  Query: {
    async getReview(_, { ID }) {
      return await Review.findById(ID);
    },
    async getReviews(_, { limit }) {
      return await Review.find().limit(limit);
    },
    async getUser(_, { username }) {
      return await User.findOne({ username: username });
    },
    async getUsers(_, { limit }) {
      return await User.find().limit(limit);
    },
    async getGame(_, { ID }) {
      return await Game.findById(ID);
    },
    async getGames(_, { limit, offset }) {
      return await Game.find().skip(offset).limit(limit);
    },
    async getGenre(_, { id }) {
      return await Genre.findOne({ id: id });
    },
    async getGenres(_, { limit }) {
      return await Genre.find().limit(limit);
    },
    async getPlatform(_, { id }) {
      return await Platform.findOne({ id: id });
    },
    async getPlatforms(_, { limit }) {
      return await Platform.find().limit(limit);
    },
  },
  Mutation: {
    async createReview(_, { reviewInput: { user, title, content, rating, platform, gameID } }) {
      const review = await new Review({
        user,
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
      await User.findByIdAndUpdate(user, {
        $addToSet: { reviews: review._id },
      });
      return review;
    },
    async updateReview(
      _,
      { ID, reviewInput: { user, title, content, rating, platform, gameID } }
    ) {
      await Review.updateOne(
        { _id: ID },
        { $set: { user, title, content, rating, platform, gameID } }
      );
      return ID;
    },
    async deleteReview(_, { ID }) {
      await Review.deleteOne({ _id: ID });
      return ID;
    },
    async createUser(_, { userInput: { username } }) {
      const user = await new User({
        username,
      }).save();
      return user;
    },
  },
  Game: {
    async genres(game) {
      return await Genre.find({ id: { $in: game.genres } });
    },
    async platforms(game) {
      return await Platform.find({ id: { $in: game.platforms } });
    },
    async reviews(game, { limit }) {
      return await Review.find({ _id: { $in: game.reviews} }).limit(limit);
    }
  },
  Review: {
    async user(review) {
      return await User.findById(review.user);
    }
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

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
