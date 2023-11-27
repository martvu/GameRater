import { describe, it, expect } from 'vitest';
import { render, renderHook, screen, act, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import FavoriteHeart from '@/components/FavoriteHeart';
import { MockedProvider } from '@apollo/client/testing';
import { allMocks } from '@/mocks/mockQueries';
import userEvent from '@testing-library/user-event';
import { userState } from '@/state/atoms';
import { User } from '@/gql/graphql';

interface renderFavoriteHeartOptions {
  user?: User;
}

const defaultUser = {
  _id: '',
  username: '',
  favorites: [],
  reviews: [],
};

function renderFavoriteHeart({
  user = defaultUser,
}: renderFavoriteHeartOptions = {}) {
  return render(
    <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot
        initializeState={({ set }) => {
          set(userState, user as User);
        }}
      >
        <FavoriteHeart game={{ _id: '1', name: 'Game One' }} />
      </RecoilRoot>
    </MockedProvider>
  );
}

describe('FavoriteHeart Component', () => {
  it('renders correctly and can be clicked', async () => {
    renderFavoriteHeart();
    const button = screen.getByTestId('favorite-btn');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.getByTestId('sign-in-alert')).toBeInTheDocument();
  });

  describe('FavoriteHeart Component', () => {
    it('renders correctly', () => {
      renderFavoriteHeart();
      const button = screen.getByTestId('favorite-btn');
      expect(button).toBeInTheDocument();
    });

    it('opens sign-in form', async () => {
      renderFavoriteHeart();
      const button = screen.getByTestId('favorite-btn');
      await userEvent.click(button);
      screen.debug();
      expect(screen.getByTestId('sign-in-alert')).toBeInTheDocument();
      // Assert any expected behavior after click
    });
  });

  it('can be clicked again to remove favorite', async () => {
    renderFavoriteHeart({
      user: {
        _id: '1',
        username: 'testUser',
        favorites: [{ _id: '1', name: 'Game One' }],
        reviews: []
      },
    });
    const button = screen.getByTestId('favorite-btn');
    const heart = screen.getByTestId('heart-icon');
    // shows filled heart when favorited
    expect(heart).toHaveClass('fill-red-600 text-red-600');
    fireEvent.click(button);
    // shows empty heart when unfavorited
    expect(heart).not.toHaveClass('fill-red-600 text-red-600');
  });
});
