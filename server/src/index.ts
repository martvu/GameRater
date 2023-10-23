import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import Review from "../models/review.js";
import Game from "../models/game.js";
import Genre from "../models/genre.js";
import Platform from "../models/platform.js";

const MONGODB = "mongodb://it2810-48.idi.ntnu.no:27017/GameRater";

const typeDefs = `#graphql
  type Review {
    _id: String
    author: String
    title: String
    content: String
    rating: Int
  }

  type Game {
    _id: String
    name: String
    summary: String
    first_release_date: String
    cover_image_id: String
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
    author: String
    title: String
    content: String
    rating: Int
  }

  type Query {
    getReview(ID: ID!): Review!
    getReviews(limit: Int): [Review!]!
    getGame(ID: ID!): Game!
    getGames(limit: Int): [Game!]!
    getGenre(id: Int): Genre!
    getGenres(limit: Int): [Genre!]!
    getPlatform(id: Int): Platform!
    getPlatforms(limit: Int): [Platform!]!
  }

  type Mutation {
    createReview(reviewInput: ReviewInput): Review!
    updateReview(ID: ID!, reviewInput: ReviewInput): String!
    deleteReview(ID: ID!): String!
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
    async getGame(_, { ID }) {
      return await Game.findById(ID);
    },
    async getGames(_, { limit }) {
      return await Game.find().limit(limit);
    },
    async getGenre(_, { id }) {
      //return await Genre.findById(ID);
      return await Genre.findOne({ id: id });
    },
    async getGenres(_, { limit }) {
      return await Genre.find().limit(limit);
    },
    async getPlatform(_, { id }) {
      //return await Platform.findById(ID);
      return await Platform.findOne({ id: id });
    },
    async getPlatforms(_, { limit }) {
      return await Platform.find().limit(limit);
    },
  },
  Mutation: {
    async createReview(_, { reviewInput: { author, title, content, rating } }) {
      const review = await new Review({
        author,
        title,
        content,
        rating,
      }).save();
      return review;
    },
    async updateReview(
      _,
      { ID, reviewInput: { author, title, content, rating } }
    ) {
      await Review.updateOne(
        { _id: ID },
        { $set: { author, title, content, rating } }
      );
      return ID;
    },
    async deleteReview(_, { ID }) {
      await Review.deleteOne({ _id: ID });
      return ID;
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
