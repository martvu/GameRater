import { render, screen, waitFor } from '@testing-library/react';
import GameListPage from '@/pages/GameListPage';
import { vi, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { allMocks as mocks } from '../mocks/mockQueries';
import { testPageRender } from './test-utils';

beforeAll(() => {
  // Mock `window.scrollTo` to accept any arguments
  window.scrollTo = vi.fn((x?: number | ScrollToOptions, y?: number) => {});
});

// Mock 'react-router-dom'
vi.mock('react-router-dom', async () => {
  const actualModule =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );

  return {
    ...actualModule,
    useParams: vi.fn(() => ({ keyword: 'mockedKeyword' })),
  };
});
// Mocks for GraphQL, useParams, etc.

describe('GameListPage Component', () => {
  it('renders the GamesList component with mocked GraphQL data', async () => {
    testPageRender(<GameListPage />, { mocks });
    // Wait for the mocked data to be displayed
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
      expect(screen.getByText('1 results')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
    });
  });

  it('signs in and renders correctly', async () => {
    testPageRender(<GameListPage />, { mocks });
    await userEvent.click(screen.getByText('Sign In'));
    await userEvent.type(screen.getByLabelText('Username'), 'testuser{enter}');
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
      expect(screen.getByTestId('sign-out-btn')).toBeInTheDocument();
      expect(screen.getByText('Example Game')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText('Reviewed')).toBeInTheDocument();
    });
  });

  // NOT WORKING
  it('gets sign in prompt when trying to favorite a game', async () => {
    testPageRender(<GameListPage />, { mocks });
   
  });

});
