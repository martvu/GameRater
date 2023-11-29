import { ApolloServer } from '@apollo/server';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolvers } from '../resolvers.js';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import request from 'supertest';
import mongoose from 'mongoose';
import {
  TEST_ADD_FAVORITES,
  TEST_CREATE_REVIEW,
  TEST_GET_FILTERS,
  TEST_GET_GAME,
  TEST_REMOVE_FAVORITES,
  TEST_SEARCH,
  TEST_SEARCH_SUGGESTIONS,
  TEST_SIGN_IN_OR_CREATE_USER,
} from './testQueries.js';

const app = express();
const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

beforeAll(async () => {
  // Create a test server to test against
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await testServer.start();

  app.use('/graphql', express.json(), expressMiddleware(testServer));
  app.listen({ port: 0 });
  await mongoose.connect('mongodb://it2810-48.idi.ntnu.no:27017/GameRaterTest');

  // Clean up test database before running tests
  const Review = mongoose.model('reviews');
  const User = mongoose.model('users');

  const deleteByUsername = async username => {
    try {
      const result = await User.findOneAndDelete({ username: username });
      if (result) {
        console.log(`User with username ${username} deleted.`);
      } else {
        console.log(`User with username ${username} not found.`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  // Delete user with username 'testUser' if it exists
  await deleteByUsername('testUser');
  // Delete all documents in the reviews collection
  await Review.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test get filters', () => {
  it('returns genre and platform', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_GET_FILTERS,
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
            name: 'Oculus VR',
          },
          {
            name: 'SteamVR',
          },
        ],
      },
    });
  });
});

describe('Test game search and filter', () => {
  it('suggests search', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_SEARCH_SUGGESTIONS,
        variables: { query: 'Super Mario Wonder' },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        getSearchSuggestions: [
          {
            name: 'Super Mario Bros. Wonder',
            _id: '655e6751d444b31dd6891333',
          },
        ],
      },
    });
  });
  it('searches, filters and returns correct game', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_SEARCH,
        variables: {
          query: 'mario',
          limit: 1,
          offset: 0,
          platforms: [130],
          genres: [8],
          sortBy: { field: 'first_release_date', order: 'DESC' },
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
              _id: '655e6751d444b31dd6891333',
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
  });
});

describe('Test user', () => {
  it('creates a user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_SIGN_IN_OR_CREATE_USER,
        variables: { userInput: { username: 'testUser' } },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        signInOrCreateUser: {
          username: 'testUser',
        },
      },
    });
  });
  it('adds favorites', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_ADD_FAVORITES,
        variables: { username: 'testUser', gameID: '655e6751d444b31dd6891333' },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        addFavorites: {
          username: 'testUser',
          favorites: [
            {
              name: 'Super Mario Bros. Wonder',
              _id: '655e6751d444b31dd6891333',
            },
          ],
        },
      },
    });
  });
  it('removes favorites', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_REMOVE_FAVORITES,
        variables: { username: 'testUser', gameID: '655e6751d444b31dd6891333' },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        removeFavorites: {
          username: 'testUser',
          favorites: [],
        },
      },
    });
  });
});

describe('Test review', () => {
  it('creates a valid review', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_CREATE_REVIEW,
        variables: {
          reviewInput: {
            user: 'testUser',
            title: 'validReview',
            content: 'testContent',
            rating: 5,
            platform: 'Nintendo Switch',
            gameID: '655e6751d444b31dd6891333',
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        createReview: {
          title: 'validReview',
          rating: 5,
          user: 'testUser',
        },
      },
    });
  });
  it('throw error when invalid rating (6)', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_CREATE_REVIEW,
        variables: {
          reviewInput: {
            user: 'testUser',
            title: 'invalidRatingReview',
            content: 'testContent',
            rating: 6,
            platform: 'Nintendo Switch',
            gameID: '655e6751d444b31dd6891333',
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      errors: [
        {
          message: 'Rating must be an integer between 1 and 5',
        },
      ],
    });
  });
  it('throw error when invalid rating (0)', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_CREATE_REVIEW,
        variables: {
          reviewInput: {
            user: 'testUser',
            title: 'invalidRatingReview',
            content: 'testContent',
            rating: 0,
            platform: 'Nintendo Switch',
            gameID: '655e6751d444b31dd6891333',
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      errors: [
        {
          message: 'Rating must be an integer between 1 and 5',
        },
      ],
    });
  });
  it('throw error when invalid user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_CREATE_REVIEW,
        variables: {
          reviewInput: {
            user: 'invalid',
            title: 'invalidUserReview',
            content: 'testContent',
            rating: 3,
            platform: 'Nintendo Switch',
            gameID: '655e6751d444b31dd6891333',
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      errors: [
        {
          message: 'User not found',
        },
      ],
    });
  });
  it('throws error when gameID is invalid', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_CREATE_REVIEW,
        variables: {
          reviewInput: {
            user: 'testUser',
            title: 'invalidGameReview',
            content: 'testContent',
            rating: 3,
            platform: 'Nintendo Switch',
            gameID: 'invalidId',
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      errors: [
        {
          message: 'Error updating game',
        },
      ],
    });
  });
  it('game reviews contains only validReview', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: TEST_GET_GAME,
        variables: { id: '655e6751d444b31dd6891333', username: 'testUser' },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        getGame: {
          reviews: {
            reviews: [
              {
                title: 'validReview',
                user: 'testUser',
              },
            ],
            userHasReviewed: true,
          },
        },
      },
    });
  });
});
