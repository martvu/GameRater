import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Search, XCircle } from 'lucide-react';
import {
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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

/**
 * Searchbar component
 * @param {boolean} [showFullWidthSearch] - Whether to show the full width search bar or not
 */
const Searchbar = ({ showFullWidthSearch }: SearchbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword } = useParams<{ keyword?: string }>();
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [isFocused, setIsFocused] = useState(false);
  const [getGames, { called, loading, data }] = useLazyQuery(
    GET_SEARCH_SUGGESTIONS,
    {
      fetchPolicy: 'no-cache', // Use 'cache-and-network' or 'network-only' if you want to always fetch the latest results
    }
  );
  const dropdownRef = useRef(null);

  // Debounce the search query (Wait for 300ms after the user stops typing)
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.trim()) {
        getGames({ variables: { query: searchQuery } });
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchQuery, getGames]);

  const handleBlur = (event: FocusEvent) => {
    // Delay hiding dropdown to allow for click events to be processed
    setTimeout(() => {
      const relatedTarget = event.relatedTarget as Node | null;
      const dropdown = dropdownRef.current as HTMLUListElement | null;

      if (dropdown && !dropdown.contains(relatedTarget)) {
        setIsFocused(false);
      }
    }, 100);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const dropdown = dropdownRef.current as HTMLUListElement | null;
      const firstItem = dropdown?.querySelector('li');
      (firstItem as HTMLElement)?.focus();
    } else if (event.key === 'Escape') {
      event.currentTarget.blur();
      setIsFocused(false);
    }
  };
  const handleLinkClick = () => {
    setIsFocused(false); // Hide the dropdown
    ((document.activeElement as HTMLElement) || null)?.blur(); // Remove focus from the active element
  };
  const handleListItemKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    // Get the parent list item of the focused element
    const listItem = event.currentTarget;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault(); // Stop the page from scrolling

        const nextListItem =
          event.key === 'ArrowDown'
            ? (listItem.nextElementSibling as HTMLElement | null)
            : (listItem.previousElementSibling as HTMLElement | null);

        nextListItem?.focus();
        break;
      }
      case 'Enter': {
        // Simulate a click on the Link component when Enter is pressed
        const link = listItem.querySelector('a') as HTMLAnchorElement | null;
        if (link) {
          link.click(); // Perform the navigation
          setIsFocused(false); // Hide the dropdown
          ((document.activeElement as HTMLElement) || null)?.blur(); // Remove focus from the active element
        }
        break;
      }
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFocused(false);
    ((document.activeElement as HTMLElement) || null)?.blur();
    navigate(
      searchQuery === '' || searchQuery === null
        ? '/'
        : `/search/${encodeURIComponent(searchQuery)}`
    ); // Navigate to the new URL
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex">
        <Label htmlFor="search" className="sr-only" />
        <div
          className={`relative ${
            showFullWidthSearch ? 'w-full' : 'md:w-[350px] lg:w-[400px]'
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
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
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
                if (!location.pathname.startsWith('/game/')) navigate('/');
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
      {isFocused && searchQuery && (
        <ul
          aria-live="polite"
          aria-label="search suggestions"
          ref={dropdownRef}
          className={cn(
            'absolute top-full z-10 rounded-md border border-accent bg-background shadow-lg',
            showFullWidthSearch
              ? 'w-full'
              : 'w-[220px] md:w-[320px] lg:w-[420px]'
          )}
        >
          {loading && <li className="p-2">Loading...</li>}
          {!loading &&
            data &&
            data.getSearchSuggestions.map(game => (
              <li
                key={game._id}
                className="p-2 hover:bg-accent"
                tabIndex={0}
                data-testid="search-item"
                role="listitem"
                onKeyDown={handleListItemKeyDown}
              >
                <Link
                  aria-label={`Link to ${game.name} detail page`}
                  to={`/game/${game._id}`}
                  onClick={handleLinkClick}
                >
                  <div className="flex gap-4">
                    <ProgressiveImage
                      fullSrc={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover_image_id}.jpg`}
                      placeholderSrc={imageNotFound}
                      alt={game.name as string}
                      className="h-14 w-10 rounded-full object-cover"
                    />
                    <p className="text-left text-sm font-semibold">
                      {game.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          {called &&
            !loading &&
            data &&
            data.getSearchSuggestions.length === 0 && (
              <li className="p-2 text-center">No results found.</li>
            )}
        </ul>
      )}
    </>
  );
};

export default Searchbar;
