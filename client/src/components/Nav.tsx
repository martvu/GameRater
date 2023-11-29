import { ModeToggle } from '@/components/theme/ModeToggle';
import Logo from '@/assets/GameRater.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserNav } from './UserNav';
import Searchbar from '@/components/Searchbar.tsx';
import { cn } from '@/lib/utils.ts';
import useReset from '@/hooks/useReset.tsx';

/**
 * Nav component
 * The navigation bar at the top of the page
 */
export default function Nav() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const reset = useReset();

  function resetPage() {
    window.scrollTo(0, 0);
    reset();
  }

  return (
    <header className="fixed top-0 z-40 flex h-16 w-[calc(100vw-0.75rem)] items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav
        className={cn(
          'flex w-full items-center',
          showFullWidthSearch
            ? 'justify-center md:justify-between'
            : 'justify-between'
        )}
      >
        <Link data-testid="logo-btn" to="/" aria-label="GameRater Home">
          <div
            className={cn(
              'w-32 items-center justify-between gap-2 px-2',
              showFullWidthSearch ? 'hidden md:flex' : 'flex'
            )}
          >
            <Button
              variant="text"
              className="hover:opacity-80"
              onClick={resetPage}
            >
              <Avatar>
                <AvatarImage src={Logo} alt="GameRater logo" />
                <AvatarFallback>GR</AvatarFallback>
              </Avatar>
              <h1 className="ml-1 text-xl font-bold tracking-wide text-primary">
                GameRater
              </h1>
            </Button>
          </div>
        </Link>
        <div
          className={cn(
            'w-full max-w-sm flex-grow items-center justify-center space-x-2 md:flex',
            showFullWidthSearch ? 'flex' : 'hidden md:flex'
          )}
        >
          {showFullWidthSearch && (
            <Button
              aria-label="return to collapsed search"
              onClick={() => setShowFullWidthSearch(false)}
              size="icon"
              variant="ghost"
              className="flex-shrink-0 rounded-2xl md:hidden"
            >
              <ArrowLeft />
            </Button>
          )}
          <Searchbar showFullWidthSearch={showFullWidthSearch} />
        </div>
        <div
          className={cn(
            'mr-1 flex-shrink-0 items-center gap-1 md:gap-2',
            showFullWidthSearch ? 'hidden md:flex' : 'flex'
          )}
        >
          <Button
            aria-label="open searchbar"
            onClick={() => setShowFullWidthSearch(true)}
            size="icon"
            variant="ghost"
            className="rounded-2xl md:hidden"
          >
            <Search size={24} />
          </Button>
          <UserNav />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
