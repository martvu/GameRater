import Botw from '../assets/botw.jpeg';
import MarioWonder from '../assets/mariowonder.jpeg';
import { GameCard } from './GameCard';
import SortBy from './SortBy';

const gameData = [
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    description: 'Description for Game 1',
    image: Botw,
  },
  {
    title: 'Mario Wonder',
    description: 'Description for Game 2',
    image: MarioWonder,
  },
  { title: 'Game 3', description: 'Description for Game 3' },
  { title: 'Game 4', description: 'Description for Game 4' },
  { title: 'Game 5', description: 'Description for Game 5' },
  { title: 'Game 6', description: 'Description for Game 6' },
  { title: 'Game 7', description: 'Description for Game 7' },
  { title: 'Game 8', description: 'Description for Game 8' },
];

export default function GameList() {
  return (
    <div className='flex flex-col w-full'>
      <div className='mr-1 flex justify-end'>
        <SortBy />
      </div>
      <div className="flex max-w-[1000px] flex-row flex-wrap justify-end">
        {gameData.map(game => (
          <div className="m-1" key={game.title}>
            <GameCard
              title={game.title}
              description={game.description}
              image={game.image ? game.image : Botw}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
