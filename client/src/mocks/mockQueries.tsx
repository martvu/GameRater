import { GET_GAMES } from "@/components/GamesList";
import { GET_GAME } from "@/pages/GameDetailPage";
import { gql } from "@apollo/client";

const getGamesMock = {
  request: {
    query: GET_GAMES,
    variables: {
      limit: 24,
      offset: 0,
      sortBy: { field: 'first_release_date', order: 'desc' },
      platforms: [],
      genres: [],
      query: 'mockedKeyword',
      userId: '',
      showFavorites: false,
      showReviewedGames: false,
    },
  },
  result: {
    data: {
      search: {
        count: 1,
        games: [
          {
            _id: '1',
            aggregated_rating: 85,
            first_release_date: 1620000000,
            summary: 'Example game summary',
            cover_image_id: 'cover1',
            name: 'Example Game',
          },
          // Add more game objects as needed
        ],
        filters: {
          genres: [1, 2], // Example genre IDs
          platforms: [3, 4], // Example platform IDs
        },
      },
    },
  },
};

const getGamesSignedInMock = {
  request: {
    query: GET_GAMES,
    variables: {
      limit: 24,
      offset: 0,
      sortBy: { field: 'first_release_date', order: 'desc' },
      platforms: [],
      genres: [],
      query: 'mockedKeyword',
      userId: '1',
      showFavorites: false,
      showReviewedGames: false,
    },
  },
  result: {
    data: {
      search: {
        count: 1,
        games: [
          {
            _id: '1',
            aggregated_rating: 85,
            first_release_date: 1620000000,
            summary: 'Example game summary',
            cover_image_id: 'cover1',
            name: 'Example Game',
            platforms: [1, 2],
            genres: [3, 4],
          },
          // Add more game objects as needed
        ],
        filters: {
          genres: [1, 2], // Example genre IDs
          platforms: [3, 4], // Example platform IDs
        },
      },
    },
  },
};

const getFiltersMock = {
  request: {
    query: gql`
      query GetFilters {
        getGenres {
          id
          name
          gamesCount
        }
        getPlatforms {
          id
          name
          gamesCount
        }
      }
    `,
    variables: {}, // If your query uses variables, specify them here
  },
  result: {
    data: {
      getGenres: [
        { id: 1, name: 'Genre 1', gamesCount: 10 },
        { id: 2, name: 'Genre 2', gamesCount: 20 },
      ],
      getPlatforms: [
        { id: 1, name: 'Platform 1', gamesCount: 15 },
        { id: 3, name: 'Platform 3', gamesCount: 25}
      ],
    },
  },
};

const getAvgRatingMock = {
  request: {
    query: gql`
      query GetAvgRating($gameID: ID!) {
        getAvgRating(gameID: $gameID)
      }
    `,
    variables: { gameID: '1' },
  },
  result: {
    data: {
      getAvgRating: 4.5,
    },
  },
};

const signInMock = {
  request: {
    query: gql`
      mutation SignInOrCreateUser($userInput: UserInput) {
        signInOrCreateUser(userInput: $userInput) {
          _id
          username
          favorites {
            _id
          }
          reviews {
            _id
          }
        }
      }
    `,
    variables: {
      userInput: {
        username: 'testuser',
      },
    },
  },
  result: {
    data: {
      signInOrCreateUser: {
        _id: '1',
        username: 'testuser',
        favorites: [],
        reviews: [],
      },
    },
  },
};

const getGameMock = {
  request: {
    query: GET_GAME,
    variables: {
      id: '1', // Example game ID
      limit: 5, // Example limit
      offset: 0, // Example offset
    },
  },
  result: {
    data: {
      getAvgRating: 4.5, // Example average rating
      getGame: {
        _id: '1',
        name: 'Example Game',
        summary: 'This is an example game summary.',
        imageId: 'image1',
        first_release_date: 1620000000,
        aggregatedRating: 85,
        platforms: [
          { name: 'PC' },
          // ... other platforms
        ],
        genres: [
          { name: 'Adventure' },
          // ... other genres
        ],
        reviews: {
          count: 2,
          reviews: [
            {
              _id: 'review1',
              user: 'user1',
              title: 'Great Game',
              content: 'This is a great game because...',
              rating: 5,
              platform: 'PC',
              gameID: '1',
            },
            // ... other reviews
          ],
        },
      },
    },
  },
  // Optionally, you can add an `error` field to mock a failure scenario
};

const allMocks = [
  getGamesMock,
  getFiltersMock,
  getAvgRatingMock,
  signInMock,
  getGamesSignedInMock,
  getGameMock,
  // Add more mocks as needed for other queries
];

export {
  allMocks,
  getGamesMock,
  getGamesSignedInMock,
  getFiltersMock,
  getAvgRatingMock,
  signInMock,
}