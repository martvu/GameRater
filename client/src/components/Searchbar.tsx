import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Search, XCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { searchQueryState } from '@/state/atoms.ts';
import { useRecoilState } from 'recoil';
import { useLazyQuery } from '@apollo/client';
import { GET_SEARCH_SUGGESTIONS } from '@/lib/queries.tsx';
import { cn } from '@/lib/utils.ts';
import ProgressiveImage from '@/components/ProgressiveImage.tsx';
import imageNotFound from '@/assets/img-fallback.svg';

type SearchbarProps = {
  showFullWidthSearch?: boolean;
};
const Searchbar = ({ showFullWidthSearch }: SearchbarProps) => {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword?: string }>();
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [isFocused, setIsFocused] = useState(false);
  const [getGames, { called, loading, data }] = useLazyQuery(
    GET_SEARCH_SUGGESTIONS,
    {
      fetchPolicy: 'no-cache', // Use 'cache-and-network' or 'network-only' if you want to always fetch the latest results
    }
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.trim()) {
        getGames({ variables: { query: searchQuery } });
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchQuery, getGames]);

  const handleBlur = () => {
    // Delay hiding dropdown to allow for click events to be processed
    setTimeout(() => setIsFocused(false), 300);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(
      searchQuery === '' || searchQuery === null
        ? '/'
        : `/search/${encodeURIComponent(searchQuery)}`
    ); // Navigate to the new URL
  };
  console.log(data);
  return (
    <>
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
            id="search"
            data-testid="search-input"
            type="text"
            className="w-full rounded-xl bg-muted pr-24 shadow-inner md:w-full lg:w-full"
            placeholder={keyword || 'Search'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {searchQuery && (
            <Button
              aria-label="Empty search input"
              data-testid="empty-search-input"
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
            aria-label="Search"
            variant="search"
            type="submit"
            className="absolute right-0 top-0 rounded-l-none rounded-r-xl px-3 active:opacity-90"
          >
            <Search />
          </Button>
        </div>
      </form>
      {isFocused && searchQuery && called && loading && <div>Loading...</div>}
      {isFocused && searchQuery && data && (
        <ul
          className={cn(
            'absolute top-full z-10 rounded-md border border-accent bg-background shadow-lg',
            showFullWidthSearch
              ? 'w-full'
              : 'w-[220px] md:w-[320px] lg:w-[420px]'
          )}
        >
          {data.getSearchSuggestions.map(game => (
            <li key={game._id} className="p-2 hover:bg-accent">
              <Link to={`/game/${game._id}`}>
                <div className="flex gap-4">
                  <div className="w-10">
                    <ProgressiveImage
                      fullSrc={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`}
                      placeholderSrc={imageNotFound}
                      alt={game.name as string}
                      className="h-14 rounded-full object-cover"
                    />
                  </div>
                  {game.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Searchbar;
