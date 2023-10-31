import { ModeToggle } from '@/components/theme/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignInModal from './SignInModal';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '@/state/atoms';

export default function Nav() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [user] = useRecoilState(userState);
  const signOutUser = useResetRecoilState(userState);
  return (
    <nav
      className={`relative flex h-20 w-full items-center gap-10 px-2 md:px-4 lg:gap-20 lg:px-8 ${
        showFullWidthSearch
          ? 'justify-center md:justify-between'
          : 'justify-between'
      }`}
    >
      <Link to="/">
        <div
          className={`w-28 items-center justify-between gap-2 px-2 ${
            showFullWidthSearch ? 'hidden md:flex' : 'flex'
          }`}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold text-green-600">GameRater</h1>
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
        <Input type="search" placeholder="Search" />
        <Button type="submit">Search</Button>
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
        {user.username === '' ? (
          <SignInModal />
        ) : (
          <div className="flex items-center gap-3">
            <h1>{user.username}</h1>
            <Button onClick={signOutUser}>Sign Out</Button>
          </div>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
