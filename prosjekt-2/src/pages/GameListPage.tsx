import Filters from '@/components/Filters';
import GameList from '@/components/GameList';
import Nav from '@/components/Nav';

export default function GameListPage() {
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex flex-col md:flex-row">
        <Filters />
        <GameList />
      </div>
    </div>
  );
}
