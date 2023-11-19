import { ModeToggle } from '@/components/theme/ModeToggle';
import Logo from '@/assets/logo.webp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, XCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { UserNav } from './UserNav';

export default function Nav() {
  const { keyword } = useParams<{ keyword?: string }>();
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const setSelectedPlatforms = useSetRecoilState(selectedPlatformsState);
  const setSelectedGenres = useSetRecoilState(selectedGenresState);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <header className="fixed top-0 z-40 flex h-16 w-full items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav
        className={`flex w-full items-center ${
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
              <h1 className="ml-1 text-xl font-bold tracking-wide text-primary">
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
          <form onSubmit={handleSubmit} className="flex">
            <Label htmlFor="search" className="sr-only" />
            <div
              className={`relative ${
                showFullWidthSearch
                  ? 'w-full'
                  : 'w-[200px] md:w-[300px] lg:w-[400px]'
              }`}
            >
              <Input
                type="text"
                className="w-full rounded-xl shadow-inner bg-muted pr-24 md:w-full lg:w-full"
                placeholder={keyword || 'Search'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="round"
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    navigate('/');
                  }}
                  className="absolute bottom-0 right-10 top-0 flex items-center justify-center"
                >
                  <XCircle size={18} />
                </Button>
              )}
              <Button
                variant="search"
                type="submit"
                className="absolute right-0 top-0 px-3 active:opacity-90 rounded-l-none rounded-r-xl"
              >
                <Search />
              </Button>
            </div>
          </form>
        </div>
        <div
          className={`flex-shrink-0 items-center md:gap-2 ${
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
          <div>
            <UserNav />
          </div>

          {/* <SignInOutButton /> */}
          <div className="mr-1">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
