import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import FavoriteHeart from '@/components/FavoriteHeart';
import { MockedProvider } from '@apollo/client/testing';
import { allMocks } from '@/mocks/mockQueries';
import userEvent from '@testing-library/user-event';

// Mocks (Apollo, Recoil, LocalStorage)
// ...

describe('FavoriteHeart Component', () => {
  it('renders correctly and can be clicked', async () => {
    render(
      <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot>
        <FavoriteHeart game={{ _id: 'game1', name: 'Game One' }} />
      </RecoilRoot>
      </MockedProvider>
    );
  
    const button = screen.getByTestId('favorite-btn');
    expect(button).toBeInTheDocument();
  
    await userEvent.click(button);
    screen.debug();
    expect(screen.getByTestId('sign-in-alert')).toBeInTheDocument();
    // Assert any expected behavior after click
  });
  
});
