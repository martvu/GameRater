import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Search, XCircle } from 'lucide-react';
import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { searchQueryState } from '@/state/atoms.ts';
import { useRecoilState } from 'recoil';

type SearchbarProps = {
  showFullWidthSearch?: boolean;
};
const Searchbar = ({ showFullWidthSearch }: SearchbarProps) => {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword?: string }>();
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(
      searchQuery === '' || searchQuery === null
        ? '/'
        : `/search/${encodeURIComponent(searchQuery)}`
    ); // Navigate to the new URL
  };
  return (
    <form onSubmit={handleSubmit} className="flex">
      <Label htmlFor="search" className="sr-only" />
      <div
        className={`relative ${
          showFullWidthSearch ? 'w-full' : 'w-[200px] md:w-[300px] lg:w-[400px]'
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
  );
};

export default Searchbar;
