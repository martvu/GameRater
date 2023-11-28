import { gql } from '@/gql';

export const GET_GAMES = gql(`
  query Search($userId: String, $showFavorites: Boolean, $showReviewedGames: Boolean, $query: String, $limit: Int!, $offset: Int!, $sortBy: GameSortInput, $platforms: [Int!], $genres: [Int!]) {
    search(userId: $userId, showFavorites: $showFavorites, showReviewedGames: $showReviewedGames, query: $query, limit: $limit, offset: $offset, sortBy: $sortBy, platforms: $platforms, genres: $genres) {
      count
      games{
        _id
        aggregated_rating
        first_release_date
        summary
        cover_image_id
        name
        user_rating
      }
      filters {
        genres 
        platforms
      }
    }
  }
`);

export const GET_FILTERS = gql(`
  query GetFilters {
    getGenres {
        id
        name
    }
    getPlatforms {
        id
        name
    }
  }
`);

export const GET_GAME = gql(`
  query GetGame($id: ID!, $limit: Int!, $offset: Int!, $username: String) {
    getGame(ID: $id) {
      _id
      name
      summary
      imageId: cover_image_id
      first_release_date
      aggregatedRating: aggregated_rating
      user_rating
      platforms {
        name
      }
      genres {
        name
      }
      reviews(limit: $limit, offset: $offset, username: $username) {
        count
        reviews {
          _id
          user
          title
          content
          rating
          platform
          gameID
        }
        userHasReviewed
      }
    }
  }
`);

export const GET_SEARCH_SUGGESTIONS = gql(`
  query GetSearchSuggestions($query: String!) {
    getSearchSuggestions(query: $query) {
      _id
      name
      cover_image_id
    }
  }
`);

export const GET_GAME_PLATFORMS = gql(`
  query GetGamePlatforms($id: ID!) {
    getGame(ID: $id) {
      name
      platforms {
        id
        name
      }
    }
  }
`);
