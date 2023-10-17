import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import Review from "../models/review.js";

const MONGODB = "mongodb://it2810-48.idi.ntnu.no:27017/GameRater";

const typeDefs = `#graphql
  type Review {
    _id: String
    author: String
    title: String
    content: String
    rating: Int
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
      const review = await Review.findById(ID);
      return review;
    },
    async getReviews(_, { limit }) {
      return Review.find().limit(limit);
    },
  },
  Mutation: {
    async createReview(_, { reviewInput: { author, title, content, rating } }) {
      const review = await new Review({ author, title, content, rating }).save();
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
