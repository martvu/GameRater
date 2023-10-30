import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import Review from "../models/review.js";
import Game from "../models/game.js";
import Genre from "../models/genre.js";
import Platform from "../models/platform.js";
import { read, readFileSync } from "fs";

const MONGODB = "mongodb://it2810-48.idi.ntnu.no:27017/GameRater";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

const resolvers = {
  Query: {
    async getReview(_, { ID }) {
      return await Review.findById(ID);
    },
    async getReviews(_, { limit }) {
      return await Review.find().limit(limit);
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
    async createReview(_, { reviewInput: { author, title, content, rating, platform, gameID } }) {
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
      return review;
    },
    async updateReview(
      _,
      { ID, reviewInput: { author, title, content, rating, platform, gameID } }
    ) {
      await Review.updateOne(
        { _id: ID },
        { $set: { author, title, content, rating, platform, gameID } }
      );
      return ID;
    },
    async deleteReview(_, { ID }) {
      await Review.deleteOne({ _id: ID });
      return ID;
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
