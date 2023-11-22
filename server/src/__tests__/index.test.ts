import { ApolloServer } from '@apollo/server';
import { it, expect, beforeEach, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolvers } from '../resolvers.js';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import request from 'supertest';
import mongoose from 'mongoose';

const app = express();
const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

beforeAll(async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await testServer.start();

  app.use('/graphql', express.json(), expressMiddleware(testServer));
  app.listen({ port: 0 });
  console.log(app);
  await mongoose.connect('mongodb://it2810-48.idi.ntnu.no:27017/GameRaterTest');
});

it('returns genre and platform', async () => {
  const response = await request(app)
    .post('/graphql')
    .send({
      query: `
        query GetFilters($limit: Int) {
          getGenres(limit: $limit) {
            name
          }
          getPlatforms(limit: $limit) {
            name
          }
        }
      `,
      variables: { limit: 2 },
    });
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    data: {
      getGenres: [
        {
          name: 'Fighting',
        },
        {
          name: 'Shooter',
        },
      ],
      getPlatforms: [
        {
          name: 'Palm OS',
        },
        {
          name: 'Meta Quest 3',
        },
      ],
    },
  });
  console.log(response.body);
});

it('searches and returns correct games', async () => {
  const response = await request(app)
    .post('/graphql')
    .send({
      query: `
      query Search($limit: Int!, $offset: Int!, $query: String, $platforms: [Int], $genres: [Int]) {
        search(limit: $limit, offset: $offset, query: $query, platforms: $platforms, genres: $genres) {
          count
          games {
            name
            platforms {
              name
              id
            }
            genres {
              name
              id
            }
          }
        }
      }
      `,
      variables: {
        query: 'mario',
        limit: 1,
        offset: 0,
        platforms: [130],
        genres: [8],
      },
    });
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    data: {
      search: {
        count: 11,
        games: [
          {
            name: 'Super Mario Bros. Wonder',
            platforms: [
              {
                name: 'Nintendo Switch',
                id: 130,
              },
            ],
            genres: [
              {
                name: 'Platform',
                id: 8,
              },
            ],
          },
        ],
      },
    },
  });
  console.log(response.body);
});
