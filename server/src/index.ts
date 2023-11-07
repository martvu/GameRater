import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';

const MONGODB = 'mongodb://it2810-48.idi.ntnu.no:27017/GameRater';
const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
