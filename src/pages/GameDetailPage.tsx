import withLayout from '@/lib/withLayout';
import Botw from '../assets/botw.jpeg';
import { useParams, Link } from 'react-router-dom';
import { Data, gameData } from '@/components/GameData';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type GameDetailParams = {
  id: string;
};

const BaseGameDetailPage = () => {
  const { id } = useParams<GameDetailParams>();
  const index = id ? parseInt(id, 10) : NaN;
  const game: Data = gameData[index];

  // Check if the game data exists
  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="flex w-3/4 flex-wrap justify-center">
        <Link to="/">
          <Button
            size="icon"
            variant="ghost"
            className="flex-shrink-0 rounded-2xl"
          >
            <ArrowLeft />
          </Button>
        </Link>
        <div className="max-w-1/2 flex h-[300px] min-w-[240px] flex-col items-center overflow-hidden">
          <img
            src={game.image || Botw}
            alt={game.title}
            className="max-h-full max-w-full object-cover"
          />
          <div className="mt-2 flex items-center text-yellow-400">
            <p>Rating: </p>
            <Star className="mr-1 h-4" fill="#facc15" />
            <p>{game.rating}</p>
          </div>
          <div className="mt-4 flex flex-col justify-start">
            <div className="flex flex-row flex-wrap">
              <p className="mr-2">Platforms:</p>
              {game.platforms?.map(platform => (
                <li
                  className="list-none rounded-full border border-white px-2 text-sm"
                  key={platform}
                >
                  {platform}
                </li>
              ))}
            </div>

            <div className="mt-2 flex flex-row flex-wrap">
              <p className="mr-2">Genres:</p>
              {game.genres?.map(genre => (
                <li
                  className="list-none rounded-lg border border-white px-2 text-sm"
                  key={genre}
                >
                  {genre}
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-1/3 flex-col items-start justify-center pl-4">
          <h1 className="mb-4 text-2xl font-semibold">{game.title}</h1>
          <p className="mb-4 text-lg">{game.description}</p>
        </div>
      </div>
    </div>
  );
};

const GameDetailPage = withLayout(BaseGameDetailPage);
export default GameDetailPage;
