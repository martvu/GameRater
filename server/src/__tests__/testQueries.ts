export const TEST_CREATE_REVIEW = `
  mutation CreateReview($reviewInput: ReviewInput) {
    createReview(reviewInput: $reviewInput) {
      title
      rating
      user
    }
  }
`;

export const TEST_GET_FILTERS = `
  query GetFilters($limit: Int) {
    getGenres(limit: $limit) {
      name
    }
    getPlatforms(limit: $limit) {
      name
    }
  }
`;

export const TEST_SEARCH_SUGGESTIONS = `
  query SearchSuggestions($query: String!) {
    getSearchSuggestions(query: $query) {
      _id,
      name,
    }
  }
`;

export const TEST_SEARCH = `
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
`;

export const TEST_SIGN_IN_OR_CREATE_USER = `
  mutation SignInOrCreateUser($userInput: UserInput) {
    signInOrCreateUser(userInput: $userInput) {
      username
      _id
    }
  }
`;

export const TEST_ADD_FAVORITES = `
  mutation AddFavorites($username: String!, $gameID: String!) {
    addFavorites(username: $username, gameID: $gameID) {
      username
      favorites {
        name
        _id
      }
    }
  }
`;

export const TEST_REMOVE_FAVORITES = `
  mutation RemoveFavorites($username: String!, $gameID: String!) {
    removeFavorites(username: $username, gameID: $gameID) {
      username
      favorites {
        name
        _id
      }
    }
  }
`;

export const TEST_GET_GAME = `
  query GetGame($id: ID!, $username: String) {
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
`;
