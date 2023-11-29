import {
  ADD_FAVORITES,
  CREATE_REVIEW,
  REMOVE_FAVORITES,
  SIGN_IN_OR_CREATE_USER,
} from '@/lib/mutations';
import {
  GET_GAMES,
  GET_GAME,
  GET_FILTERS,
  GET_GAME_PLATFORMS,
  GET_SEARCH_SUGGESTIONS,
} from '@/lib/queries';

const getGamesMock = {
  request: {
    query: GET_GAMES,
    variables: {
      limit: 24,
      offset: 0,
      sortBy: { field: 'first_release_date', order: 'desc' },
      platforms: [],
      genres: [],
      query: undefined,
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
            user_rating: 4.5,
          },
        ],
        filters: {
          genres: [1, 2], // Example genre IDs
          platforms: [3, 4], // Example platform IDs
        },
      },
    },
  },
};

const getGamesMockedKeyword = {
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
            user_rating: 4.5,
          },
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
    query: GET_FILTERS,
    variables: {},
  },
  result: {
    data: {
      getGenres: [
        { id: 1, name: 'Genre 1' },
        { id: 2, name: 'Genre 2' },
      ],
      getPlatforms: [
        { id: 1, name: 'Platform 1' },
        { id: 3, name: 'Platform 3' },
        { id: 4, name: 'PC (Microsoft Windows)' },
        { id: 2, name: 'Nintendo Switch' },
        { id: 5, name: 'PlayStation 5' },
        { id: 6, name: 'Xbox Series X|S' },
      ],
    },
  },
};

const getGamePlatformsMock = {
  request: {
    query: GET_GAME_PLATFORMS,
    variables: { id: '1' },
  },
  result: {
    data: {
      getGame: {
        name: 'Example Game',
        platforms: [
          {
            id: 3,
            name: 'Platform 3',
          },
          {
            id: 4,
            name: 'PC (Microsoft Windows)',
          },
        ],
      },
    },
  },
};

const signInMock = {
  request: {
    query: SIGN_IN_OR_CREATE_USER,
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
      id: '1',
      limit: 5,
      offset: 0,
      username: '',
    },
  },
  result: {
    data: {
      getGame: {
        _id: '1',
        name: 'Example Game',
        summary: 'This is an example game summary.',
        imageId: 'image1',
        first_release_date: 1620000000,
        aggregatedRating: 85,
        user_rating: 4.5,
        platforms: [{ name: 'PC' }],
        genres: [{ name: 'Adventure' }],
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
            {
              _id: 'review2',
              user: 'user2',
              title: 'Good Game',
              content: 'This is a good game because...',
              rating: 4,
              platform: 'PC',
              gameID: '1',
            },
          ],
          userHasReviewed: false,
        },
      },
    },
  },
};

const getGameMock2 = {
  request: {
    query: GET_GAME,
    variables: {
      id: '1',
      limit: 5,
      offset: 0,
      username: 'testUser',
    },
  },
  result: {
    data: {
      getGame: {
        _id: '1',
        name: 'Example Game',
        summary: 'This is an example game summary.',
        imageId: 'image1',
        first_release_date: 1620000000,
        aggregatedRating: 85,
        user_rating: 4.5,
        platforms: [{ name: 'PC' }],
        genres: [{ name: 'Adventure' }],
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
            {
              _id: 'review2',
              user: 'user2',
              title: 'Good Game',
              content: 'This is a good game because...',
              rating: 4,
              platform: 'PC',
              gameID: '1',
            },
          ],
          userHasReviewed: false,
        },
      },
    },
  },
};
const addFavoritesMock = {
  request: {
    query: ADD_FAVORITES,
    variables: { username: 'testUser', gameID: '1' },
  },
  result: {
    data: {
      addFavorites: {
        _id: '1',
        username: 'testUser',
        favorites: [{ _id: '1' }],
      },
    },
  },
};

const removeFavoritesMock = {
  request: {
    query: REMOVE_FAVORITES,
    variables: { username: 'testUser', gameID: '1' },
  },
  result: {
    data: {
      removeFavorites: {
        _id: '1',
        username: 'testUser',
        favorites: [],
      },
    },
  },
};

const createReviewMock = {
  request: {
    query: CREATE_REVIEW,
    variables: {
      reviewInput: {
        title: 'Great Game',
        content: 'This is a great game because...',
        rating: 5,
        platform: 'PC (Microsoft Windows)',
        user: 'testUser',
        gameID: '1',
      },
    },
  },
  result: {
    data: {
      createReview: {
        _id: 'review1',
        user: 'testUser',
        title: 'Great Game',
        content: 'This is a great game because...',
        rating: 5,
        platform: 'PC (Microsoft Windows)',
        gameID: '1',
      },
    },
  },
};

const searchbarSuggestionsMock = {
  request: {
    query: GET_SEARCH_SUGGESTIONS,
    variables: {
      query: 'example',
    },
  },
  result: {
    data: {
      getSearchSuggestions: [
        {
          _id: '1',
          name: 'Example Game',
          cover_image_id: 'cover1',
        },
        {
          _id: '2',
          name: 'Example Game 2',
          cover_image_id: 'cover2',
        },
      ],
    },
  },
};

const allMocks = [
  createReviewMock,
  getGamePlatformsMock,
  getGamesMockedKeyword,
  addFavoritesMock,
  removeFavoritesMock,
  getGamesMock,
  getFiltersMock,
  signInMock,
  getGamesSignedInMock,
  getGameMock,
  getGameMock2,
  searchbarSuggestionsMock,
  // Add more mocks as needed for other queries
];

export {
  allMocks,
  getGamesMock,
  getGamesSignedInMock,
  getFiltersMock,
  signInMock,
};
