/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Game = {
  __typename?: 'Game';
  _id?: Maybe<Scalars['String']['output']>;
  aggregated_rating?: Maybe<Scalars['Float']['output']>;
  cover_image_id?: Maybe<Scalars['String']['output']>;
  first_release_date?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  platforms?: Maybe<Array<Maybe<Platform>>>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  summary?: Maybe<Scalars['String']['output']>;
};

export type GameReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Genre = {
  __typename?: 'Genre';
  _id?: Maybe<Scalars['String']['output']>;
  checksum?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createReview: Review;
  deleteReview: Scalars['String']['output'];
  updateReview: Scalars['String']['output'];
};

export type MutationCreateReviewArgs = {
  reviewInput?: InputMaybe<ReviewInput>;
};

export type MutationDeleteReviewArgs = {
  ID: Scalars['ID']['input'];
};

export type MutationUpdateReviewArgs = {
  ID: Scalars['ID']['input'];
  reviewInput?: InputMaybe<ReviewInput>;
};

export type Platform = {
  __typename?: 'Platform';
  _id?: Maybe<Scalars['String']['output']>;
  alternative_name?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['Int']['output']>;
  checksum?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  platform_logo?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  versions?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  websites?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type Query = {
  __typename?: 'Query';
  getAvgRating: Scalars['Float']['output'];
  getGame: Game;
  getGames: Array<Game>;
  getGenre: Genre;
  getGenres: Array<Genre>;
  getPlatform: Platform;
  getPlatforms: Array<Platform>;
  getReview: Review;
  getReviews: Array<Review>;
};

export type QueryGetAvgRatingArgs = {
  gameID: Scalars['ID']['input'];
};

export type QueryGetGameArgs = {
  ID: Scalars['ID']['input'];
};

export type QueryGetGamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetGenreArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetGenresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetPlatformArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetPlatformsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetReviewArgs = {
  ID: Scalars['ID']['input'];
};

export type QueryGetReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Review = {
  __typename?: 'Review';
  _id?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  gameID?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ReviewInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  gameID?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetFiltersQueryVariables = Exact<{ [key: string]: never }>;

export type GetFiltersQuery = {
  __typename?: 'Query';
  getPlatforms: Array<{ __typename?: 'Platform'; name?: string | null }>;
  getGenres: Array<{ __typename?: 'Genre'; name?: string | null }>;
};

export type GetAvgRatingQueryVariables = Exact<{
  gameID: Scalars['ID']['input'];
}>;

export type GetAvgRatingQuery = { __typename?: 'Query'; getAvgRating: number };

export type GetGamePlatformsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetGamePlatformsQuery = {
  __typename?: 'Query';
  getGame: {
    __typename?: 'Game';
    name?: string | null;
    platforms?: Array<{
      __typename?: 'Platform';
      id?: number | null;
      name?: string | null;
    } | null> | null;
  };
};

export type CreateReviewMutationVariables = Exact<{
  reviewInput: ReviewInput;
}>;

export type CreateReviewMutation = {
  __typename?: 'Mutation';
  createReview: {
    __typename?: 'Review';
    author?: string | null;
    title?: string | null;
    content?: string | null;
    rating?: number | null;
    platform?: string | null;
  };
};

export type GetGameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
}>;

export type GetGameQuery = {
  __typename?: 'Query';
  getAvgRating: number;
  getGame: {
    __typename?: 'Game';
    _id?: string | null;
    name?: string | null;
    summary?: string | null;
    cover_image_id?: string | null;
    first_release_date?: string | null;
    aggregated_rating?: number | null;
    platforms?: Array<{
      __typename?: 'Platform';
      name?: string | null;
    } | null> | null;
    genres?: Array<{
      __typename?: 'Genre';
      name?: string | null;
    } | null> | null;
    reviews?: Array<{
      __typename?: 'Review';
      _id?: string | null;
      author?: string | null;
      title?: string | null;
      content?: string | null;
      rating?: number | null;
      platform?: string | null;
      gameID?: string | null;
    } | null> | null;
  };
};

export type GetGamesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetGamesQuery = {
  __typename?: 'Query';
  getGames: Array<{
    __typename?: 'Game';
    aggregated_rating?: number | null;
    first_release_date?: string | null;
    summary?: string | null;
    cover_image_id?: string | null;
    name?: string | null;
    _id?: string | null;
  }>;
};

export const GetFiltersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPlatforms' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getGenres' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFiltersQuery, GetFiltersQueryVariables>;
export const GetAvgRatingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAvgRating' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'gameID' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAvgRating' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'gameID' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'gameID' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAvgRatingQuery, GetAvgRatingQueryVariables>;
export const GetGamePlatformsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGamePlatforms' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getGame' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ID' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'platforms' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetGamePlatformsQuery,
  GetGamePlatformsQueryVariables
>;
export const CreateReviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateReview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reviewInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ReviewInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createReview' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reviewInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reviewInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'author' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                { kind: 'Field', name: { kind: 'Name', value: 'platform' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;
export const GetGameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGame' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAvgRating' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'gameID' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getGame' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ID' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cover_image_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'first_release_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregated_rating' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'platforms' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'genres' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reviews' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'limit' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'author' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rating' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'platform' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gameID' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGameQuery, GetGameQueryVariables>;
export const GetGamesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGames' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getGames' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregated_rating' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'first_release_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cover_image_id' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGamesQuery, GetGamesQueryVariables>;
