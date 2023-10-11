import withLayout from '@/lib/withLayout';
import Botw from '../assets/botw.jpeg';
import { useParams } from 'react-router-dom';
import { gameData } from '@/components/GameData';
import { Star } from 'lucide-react';

type GameDetailParams = {
  id: string;
};

type Data = {
  title: string;
  description: string;
  image?: string;
  rating: number;
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
      <div className="flex w-3/4">
        <div className="flex h-[400px] w-1/2 items-center justify-center overflow-hidden">
          <img
            src={game.image || Botw}
            alt={game.title}
            className="max-h-full max-w-full object-cover"
          />
        </div>
        <div className="flex w-1/2 flex-col items-start justify-center pl-4">
          <h1 className="mb-4 text-2xl font-semibold">{game.title}</h1>
          <p className="mb-4 text-lg">{game.description}</p>
          <div className="flex items-center text-yellow-400">
            <p>Rating: </p>
            <Star className="mr-1 h-4" fill="#facc15" />
            <p>{game.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDetailPage = withLayout(BaseGameDetailPage);
export default GameDetailPage;
