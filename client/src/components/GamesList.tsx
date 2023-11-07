import { useQuery } from '@apollo/client';
import { gql } from '../gql/';
import { GameCard } from './GameCard';
import { Game } from '@/gql/graphql';
import { useRecoilState } from 'recoil';
import { sortByState } from '@/state/sortByState';
import { pageState } from '@/state/pageState';
import Pagination from './Pagination';

const GET_GAMES = gql(`
  query GetGames($limit: Int, $offset: Int, $sortBy: GameSortInput) {
    getGames(limit: $limit, offset: $offset, sortBy: $sortBy) {
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

export default function GamesList() {
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const sortBy = useRecoilState(sortByState)[0];
  const limit = 24;
  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: { limit, offset: limit * (currentPage - 1), sortBy: sortBy },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <main>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-center gap-4">
        {data?.getGames.games?.map((game: Game | null | undefined) => (
          <li
            className="m-1 flex justify-center md:justify-normal"
            key={game?._id}
          >
            {game && <GameCard game={game} />}
          </li>
        ))}
      </ul>
      <div className="my-2 flex w-full justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={Math.ceil((data?.getGames.count || 1) / limit) || 1}
        />
      </div>
    </main>
  );
}
