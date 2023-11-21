import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/state/atoms';
import { Game } from '@/gql/graphql';
import { useMutation } from '@apollo/client';
import { gql } from '../gql';
import { Dialog, DialogContent } from './ui/dialog';
import SignInAlertModal from './SignInAlertModal';

export const ADD_FAVORITES = gql(`
  mutation AddFavorites($username: String!, $gameID: String!) {
    addFavorites(username: $username, gameID: $gameID) {
      _id
      username
      favorites {
        _id
      }
    }
  }
`);

export const REMOVE_FAVORITES = gql(`
  mutation RemoveFavorites($username: String!, $gameID: String!) {
    removeFavorites(username: $username, gameID: $gameID) {
      _id
      username
      favorites {
        _id
      }
    }
  }
`);

interface FavoriteHeartProps {
  game: Game;
  variant?: 'text' | 'ghost' | 'outline' | 'secondary' | 'destructive';
}

export default function FavoriteHeart({ game, variant }: FavoriteHeartProps) {
  const [addFavorites] = useMutation(ADD_FAVORITES);
  const [removeFavorite] = useMutation(REMOVE_FAVORITES);
  const [user, setUser] = useRecoilState(userState);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    // If the user is not signed in, open the sign in alert modal
    if (!user.username) {
      setIsDialogOpen(true);
      return;
    }
    if (isUpdating) return;
    setIsUpdating(true);
    if (!user.username) {
      setIsUpdating(false);
      return;
    }
    const isFavorite = user.favorites?.some(
      favoriteGame => favoriteGame?._id === game._id
    );
    const updatedFavorites = isFavorite
      ? user.favorites?.filter(
          favoriteGame => favoriteGame && favoriteGame._id !== game._id
        )
      : [...(user.favorites || []), game];

    // Optimistically update the UI
    setUser({ ...user, favorites: updatedFavorites });

    try {
      await (isFavorite ? removeFavorite : addFavorites)({
        variables: {
          username: user.username as string,
          gameID: game._id as string,
        },
      });
    } catch (error) {
      console.log('Could not update favorites', error);
      setUser(user);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignInSuccess = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const isFavorite = user.favorites?.some(
    favoriteGame => favoriteGame?._id === game._id
  );

  return (
    <>
      <Button
        data-testid="favorite-btn"
        onClick={toggleFavorite}
        className="z-10"
        variant={variant || 'ghost'}
        size="round"
      >
        <Heart data-testid="heart-icon" className={isFavorite ? 'fill-red-600 text-red-600' : 'none'} />
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <SignInAlertModal
            message={'Please sign in to favorite this game!'}
            onSignInSuccess={handleSignInSuccess}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
