import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import { GameCard } from '@/components/GameCard';
import SortBy from '@/components/SortBy';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import withLayout from '@/lib/withLayout';
import { useQuery } from '@apollo/client';
import {  Game } from '../gql/graphql';
import { gql } from '@/gql';
import { useParams } from 'react-router-dom';

const GET_GAMES = gql(`
  query GetGames($limit: Int, $offset: Int) {
    getGames(limit: $limit, offset: $offset) {
      count
      games{
        _id
        aggregated_rating
        first_release_date
        summary
        cover_image_id
        name
      }
    }
  }
`);

const SEARCH_GAMES = gql(`
  query SearchGames($query: String!, $limit: Int, $offset: Int) {
    search(query: $query, limit: $limit, offset: $offset) {
      count
      games{
        _id
        aggregated_rating
        first_release_date
        summary
        cover_image_id
        name
      }
    }
  }
`);

interface QueryVariables {
  limit: number;
  offset: number;
  query: string; // Make query a required field
}

interface SearchGamesQuery {
  search: {
    count: number;
    games: Game[];
  };
}

interface GetGamesQuery {
  getGames: {
    count: number;
    games: Game[];
  };
}


function BaseGameListPage() {
  const { keyword } = useParams<{ keyword?: string }>();
  const limit = 24;
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure that keyword is a string, even if it's an empty string.
  const queryVariables: QueryVariables = {
    limit,
    offset: limit * (currentPage - 1),
    query: keyword ?? '', // Use nullish coalescing operator instead of ||
  };

  const query = keyword ? SEARCH_GAMES : GET_GAMES;

  const { loading, error, data } = useQuery<GetGamesQuery | SearchGamesQuery>(query, {
    variables: queryVariables,
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error); // Log the error to the console
    return <p>Error: {error.message}</p>; // Display the error message
  }
  function isSearchGamesQuery(data: SearchGamesQuery | GetGamesQuery | undefined): data is SearchGamesQuery {
    return (data as SearchGamesQuery).search !== undefined;
  }
  // Use a type guard to check if the data is a SearchGamesQuery
  const isSearchGames = isSearchGamesQuery(data);
  const games = isSearchGames ? data?.search.games : data?.getGames.games;
  const count = isSearchGames ? data?.search.count : data?.getGames.count;

  if (!games || games.length === 0) {
    return <p>No games found.</p>; // Handle the case where no games are returned
  }if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="grid flex-grow grid-cols-1 justify-center md:grid-cols-[auto,1fr] md:justify-normal">
      <div className="ml-4 hidden md:block">
        <Filters />
      </div>

      <div className="overflow-x-hidden px-8">
        <div className="z-15 sticky top-0 flex justify-between bg-background py-1 pb-4 md:justify-end">
          <div className="block md:hidden">
            <FilterModal />
          </div>
          <SortBy />
        </div>
        <div className="text-muted-foreground"></div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-center gap-4">
          {games?.map((game: Game | null | undefined) => (
            <div
              className="m-1 flex justify-center md:justify-normal"
              key={game?._id}
            >
              {game && <GameCard game={game} />}
            </div>
          ))}
        </div>
        <div className="my-2 flex w-full justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={Math.ceil((count || 1) / limit) || 1}
          />
        </div>
      </div>
    </div>
  );
}

const GameListPage = withLayout(BaseGameListPage);

export default GameListPage;


