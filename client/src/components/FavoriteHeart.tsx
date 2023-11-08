import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/state/atoms';
import { Game } from '@/gql/graphql';
import { useMutation } from '@apollo/client';
import { gql } from '../gql';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import SignInAlertModal from './SignInAlertModal';

const ADD_FAVORITES = gql(`
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

const REMOVE_FAVORITES = gql(`
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
}

export default function FavoriteHeart({ game }: FavoriteHeartProps) {
  const [addFavorites] = useMutation(ADD_FAVORITES);
  const [removeFavorite] = useMutation(REMOVE_FAVORITES);
  const [user, setUser] = useRecoilState(userState);
  const [isUpdating, setIsUpdating] = useState(false);

  async function toggleFavorite() {
    if (isUpdating) return;

    setIsUpdating(true);

    if (!user.username) {
      console.log('User not signed in');
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
    console.log(updatedFavorites);

    try {
      await (isFavorite ? removeFavorite : addFavorites)({
        variables: {
          username: user.username as string,
          gameID: game._id as string,
        },
      });
    } catch (error) {
      console.log('Could not update favorites');
      console.log(error);
      setUser(user);
    } finally {
      setIsUpdating(false);
    }
  }
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const isFavorite = user.favorites?.some(
    favoriteGame => favoriteGame?._id === game._id
  );
  const fillColor = isFavorite ? 'fill-red-600 text-red-600' : 'none';

  if (user.username === '') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={toggleFavorite}
            className="z-10"
            variant="ghost"
            size="round"
          >
            <Heart className={fillColor} />
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-auto">
          <SignInAlertModal message={'Please sign in to favorite this game!'} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Button
      onClick={toggleFavorite}
      className="z-10"
      variant="ghost"
      size="round"
    >
      <Heart className={fillColor} />
    </Button>
  );
}
