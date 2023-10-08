import Filters from "@/components/Filters";
import GameList from "@/components/GameList";
import Nav from "@/components/Nav";

export default function GameListPage() {
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex md:flex-row flex-col">
        <Filters/>
        <GameList />
      </div>
      
    </div>
  )
}
