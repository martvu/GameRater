import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import Review from "../models/review.js";
import Game from "../models/game.js";

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

  input ReviewInput {
    author: String
    title: String
    content: String
    rating: Int
  }
  
  type Query {
    getReview(ID: ID!): Review!
    getReviews(limit: Int): [Review!]!
    getGames(limit: Int): [Game!]!
    getGame(ID: ID!): Game!
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
    async getGames(_, { limit }) {
      return await Game.find().limit(limit);
    },
    async getGame(_, { ID }) {
      return await Game.findById(ID);
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
