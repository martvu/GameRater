import { ModeToggle } from '@/components/theme/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInOutButton } from '@/components/SignInOutButton.tsx';
import { Label } from './ui/label';
import { useSetRecoilState } from 'recoil';
import { defaultSortBy, sortByState } from '@/state/atoms';
import { pageState } from '@/state/atoms';

export default function Nav() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent the default form submission behavior

    navigate(query === '' || query === null ? "/" : `/search/${encodeURIComponent(query)}`);  // Navigate to the new URL
  };
  const setSortBy = useSetRecoilState(sortByState);
  const setCurrentPage = useSetRecoilState(pageState);

  function resetPage() {
    window.scrollTo(0, 0);
    setSortBy(defaultSortBy);
    setCurrentPage(1);
    localStorage.setItem('selectedSortBy', '');
    localStorage.removeItem('selectedSortLabel');
    localStorage.setItem('currentPage', '1');
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
                <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
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
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
            <Button type="submit">
            Search
          </Button>
          </form></div>
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
