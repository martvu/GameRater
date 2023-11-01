/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GetFilters {\n    getPlatforms {\n      name\n    }\n    getGenres {\n      name\n    }\n  }\n':
    types.GetFiltersDocument,
  '\n  query GetAvgRating($gameID: ID!) {\n    getAvgRating(gameID: $gameID)\n  }\n':
    types.GetAvgRatingDocument,
  '\n  query GetGamePlatforms($id: ID!) {\n    getGame(ID: $id) {\n      name\n      platforms {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetGamePlatformsDocument,
  '\n  mutation CreateReview($reviewInput: ReviewInput!) {\n    createReview(reviewInput: $reviewInput) {\n      author\n      title\n      content\n      rating\n      platform\n    }\n  }\n':
    types.CreateReviewDocument,
  '\n  query GetGame($id: ID!, $limit: Int!) {\n    getAvgRating(gameID: $id)\n    getGame(ID: $id) {\n      _id\n      name\n      summary\n      imageId: cover_image_id\n      releaseDate: first_release_date\n      aggregatedRating: aggregated_rating\n      platforms {\n        name\n      }\n      genres {\n        name\n      }\n      reviews(limit: $limit) {\n        _id\n        author\n        title\n        content\n        rating\n        platform\n        gameID\n      }\n    }\n  }\n':
    types.GetGameDocument,
  '\n  query GetGames($limit: Int) {\n    getGames(limit: $limit) {\n      _id\n      aggregated_rating\n      first_release_date\n      summary\n      cover_image_id\n      name\n    }\n  }\n':
    types.GetGamesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetFilters {\n    getPlatforms {\n      name\n    }\n    getGenres {\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetFilters {\n    getPlatforms {\n      name\n    }\n    getGenres {\n      name\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAvgRating($gameID: ID!) {\n    getAvgRating(gameID: $gameID)\n  }\n'
): (typeof documents)['\n  query GetAvgRating($gameID: ID!) {\n    getAvgRating(gameID: $gameID)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetGamePlatforms($id: ID!) {\n    getGame(ID: $id) {\n      name\n      platforms {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetGamePlatforms($id: ID!) {\n    getGame(ID: $id) {\n      name\n      platforms {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateReview($reviewInput: ReviewInput!) {\n    createReview(reviewInput: $reviewInput) {\n      author\n      title\n      content\n      rating\n      platform\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateReview($reviewInput: ReviewInput!) {\n    createReview(reviewInput: $reviewInput) {\n      author\n      title\n      content\n      rating\n      platform\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetGame($id: ID!, $limit: Int!) {\n    getAvgRating(gameID: $id)\n    getGame(ID: $id) {\n      _id\n      name\n      summary\n      imageId: cover_image_id\n      releaseDate: first_release_date\n      aggregatedRating: aggregated_rating\n      platforms {\n        name\n      }\n      genres {\n        name\n      }\n      reviews(limit: $limit) {\n        _id\n        author\n        title\n        content\n        rating\n        platform\n        gameID\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetGame($id: ID!, $limit: Int!) {\n    getAvgRating(gameID: $id)\n    getGame(ID: $id) {\n      _id\n      name\n      summary\n      imageId: cover_image_id\n      releaseDate: first_release_date\n      aggregatedRating: aggregated_rating\n      platforms {\n        name\n      }\n      genres {\n        name\n      }\n      reviews(limit: $limit) {\n        _id\n        author\n        title\n        content\n        rating\n        platform\n        gameID\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetGames($limit: Int) {\n    getGames(limit: $limit) {\n      _id\n      aggregated_rating\n      first_release_date\n      summary\n      cover_image_id\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetGames($limit: Int) {\n    getGames(limit: $limit) {\n      _id\n      aggregated_rating\n      first_release_date\n      summary\n      cover_image_id\n      name\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
