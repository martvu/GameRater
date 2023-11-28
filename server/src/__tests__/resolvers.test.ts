import { ApolloServer } from '@apollo/server';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolvers } from '../resolvers.js';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import request from 'supertest';
import mongoose from 'mongoose';

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
        query: `
          query SearchSuggestions($query: String!) {
            getSearchSuggestions(query: $query) {
              _id,
              name,
            }
          }
        `,
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
        query: `
          query Search($limit: Int!, $offset: Int!, $query: String, $platforms: [Int], $genres: [Int], $sortBy: GameSortInput) {
            search(limit: $limit, offset: $offset, query: $query, platforms: $platforms, genres: $genres, sortBy: $sortBy) {
              count
              games {
                name
                _id
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
        query: `
          mutation SignInOrCreateUser($userInput: UserInput) {
            signInOrCreateUser(userInput: $userInput) {
              username
              _id
            }
          }
        `,
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
        query: `
          mutation AddFavorites($username: String!, $gameID: String!) {
            addFavorites(username: $username, gameID: $gameID) {
              username
              favorites {
                name
                _id
              }
            }
          }
        `,
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
        query: `
          mutation RemoveFavorites($username: String!, $gameID: String!) {
            removeFavorites(username: $username, gameID: $gameID) {
              username
              favorites {
                name
                _id
              }
            }
          }
        `,
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
  it('creates review', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation CreateReview($reviewInput: ReviewInput) {
            createReview(reviewInput: $reviewInput) {
              title
              rating
              user
            }
          }
        `,
        variables: {
          reviewInput: {
            user: 'testUser',
            title: 'testTitle',
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
          title: 'testTitle',
          rating: 5,
          user: 'testUser',
        },
      },
    });
  });
  it('game contains review', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query Query($id: ID!, $username: String) {
            getGame(ID: $id) {
              reviews(username: $username) {
                reviews {
                  title
                  user
                }
                userHasReviewed
              }
            }
          }
        `,
        variables: { id: '655e6751d444b31dd6891333', username: 'testUser' },
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        getGame: {
          reviews: {
            reviews: [
              {
                title: 'testTitle',
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
