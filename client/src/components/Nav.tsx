import { ModeToggle } from '@/components/theme/ModeToggle';
import Logo from '@/assets/logo.webp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInOutButton } from '@/components/SignInOutButton.tsx';
import { Label } from './ui/label';
import { useSetRecoilState } from 'recoil';
import {
  defaultSortBy,
  selectedGenresState,
  selectedPlatformsState,
  sortByState,
} from '@/state/atoms';
import { pageState } from '@/state/atoms';
import { useRecoilState } from 'recoil';
import { searchQueryState } from '@/state/atoms';
export default function Nav() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const setSelectedPlatforms = useSetRecoilState(selectedPlatformsState);
  const setSelectedGenres = useSetRecoilState(selectedGenresState);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    localStorage.removeItem('selectedPlatforms');
    localStorage.removeItem('selectedGenres');
    navigate(
      searchQuery === '' || searchQuery === null
        ? '/'
        : `/search/${encodeURIComponent(searchQuery)}`
    ); // Navigate to the new URL
  };
  const setSortBy = useSetRecoilState(sortByState);
  const setCurrentPage = useSetRecoilState(pageState);

  function resetPage() {
    window.scrollTo(0, 0);
    setSortBy(defaultSortBy);
    setCurrentPage(1);
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSearchQuery('');
    localStorage.setItem('selectedSortBy', '');
    localStorage.removeItem('selectedSortLabel');
    localStorage.setItem('currentPage', '1');
    localStorage.removeItem('selectedPlatforms');
    localStorage.removeItem('selectedGenres');
    localStorage.removeItem('searchQuery');
  }

  return (
    <header>
      <nav
        className={`relative flex h-20 w-full items-center gap-10 px-2 md:px-4 lg:gap-20 lg:px-8 ${
          showFullWidthSearch
            ? 'justify-center md:justify-between'
            : 'justify-between'
        }`}
      >
        <Link to="/" aria-label="Return to Home Page">
          <div
            className={`w-28 items-center justify-between gap-2 px-2 ${
              showFullWidthSearch ? 'hidden md:flex' : 'flex'
            }`}
          >
            <Button
              variant="text"
              className="hover:opacity-80"
              onClick={resetPage}
            >
              <Avatar>
                <AvatarImage src={Logo} alt="GameRater logo" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold text-green-400">
                GameRater
              </h1>
            </Button>
          </div>
        </Link>
        <div
          className={`w-full max-w-sm flex-grow items-center justify-center space-x-2 md:flex ${
            showFullWidthSearch ? 'flex' : 'hidden md:flex'
          }`}
        >
          {showFullWidthSearch && (
            <Button
              onClick={() => setShowFullWidthSearch(false)}
              size="icon"
              variant="ghost"
              className="flex-shrink-0 rounded-2xl md:hidden"
            >
              <ArrowLeft />
            </Button>
          )}
          <form onSubmit={handleSubmit} className="flex gap-5">
            <Label htmlFor="search" className="sr-only" />
            <Input
              type="search"
              className="w-[150px] lg:w-[300px]"
              placeholder="Search"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
              }}
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div
          className={`flex-shrink-0 md:gap-2 ${
            showFullWidthSearch ? 'hidden md:flex' : 'flex'
          }`}
        >
          <Button
            onClick={() => setShowFullWidthSearch(true)}
            size="icon"
            variant="ghost"
            className="rounded-2xl md:hidden"
          >
            <Search size={24} />
          </Button>
          <SignInOutButton />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
