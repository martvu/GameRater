import FilterItems from './FilterItems';

const Platforms = [
  'PC',
  'PS4',
  'PS5',
  'Xbox One',
  'Xbox Series S/X',
  'Nintendo Switch',
  'Mobile',
];

const Genres = [
  'Action',
  'Action-Adventure',
  'Adventure',
  'Role-Playing',
  'Simulation',
  'Strategy',
  'Sports',
  'Puzzle',
  'Idle',
  'Racing',
  'Educational',
  'Fighting',
  'Shooter',
  'Platformer',
  'Rhythm',
  'Visual Novel',
  'Board Games',
  'Card Games',
  'Trivia',
];
export default function Filters() {
  return (
    <>
      <div className="flex h-full min-w-[250px] max-w-[250px]">
        <div className="pl-10">
          <h1 className="text-md text-left mt-4 font-bold tracking-wider md:text-xl">
            Filters
          </h1>
          <FilterItems listName="Platforms" list={Platforms} />
          <FilterItems listName="Genres" list={Genres} />
        </div>
      </div>
    </>
  );
}
