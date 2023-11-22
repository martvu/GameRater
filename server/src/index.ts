import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';
import 'dotenv/config';

const MONGODB =
  process.env.MONGODB_URI ||
  'mongodb://it2810-48.idi.ntnu.no:27017/GameRaterTest' ||
  'mongodb://localhost:27017/GameRater_local';
const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

console.log(process.env.NODE_ENV, MONGODB);
await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
