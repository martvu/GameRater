import { gql } from '@/gql';

export const ADD_FAVORITES = gql(`
  mutation AddFavorites($username: String!, $gameID: String!) {
    addFavorites(username: $username, gameID: $gameID) {
      _id
      username
      favorites {
        _id
      }
    }
  }
`);

export const REMOVE_FAVORITES = gql(`
  mutation RemoveFavorites($username: String!, $gameID: String!) {
    removeFavorites(username: $username, gameID: $gameID) {
      _id
      username
      favorites {
        _id
      }
    }
  }
`);

export const CREATE_REVIEW = gql(`
  mutation CreateReview($reviewInput: ReviewInput!) {
    createReview(reviewInput: $reviewInput) {
      user
      title
      content
      rating
      platform
      gameID
    }
  }
`);

export const SIGN_IN_OR_CREATE_USER = gql(`
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
`);