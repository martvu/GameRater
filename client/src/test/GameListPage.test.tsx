import { screen, waitFor } from '@testing-library/react';
import GameListPage from '@/pages/GameListPage';
import { vi, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { allMocks as mocks } from '../mocks/mockQueries';
import { testPageRender } from './test-utils';

beforeAll(() => {
  // Mock `window.scrollTo` to accept any arguments
  window.scrollTo = vi.fn(() => {});
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

describe('GameListPage Component', () => {
  it('matches the snapshot', async () => {
    const { asFragment } = testPageRender(<GameListPage />, { mocks });

    // Wait for any asynchronous operations to complete
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the GamesList component with mocked GraphQL data', async () => {
    testPageRender(<GameListPage />, { mocks });
    screen.debug();
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
    await userEvent.click(screen.getByText('T'));

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeInTheDocument();
      expect(screen.getByText('T')).toBeInTheDocument();
      expect(screen.getByText('Example Game')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText('Reviewed')).toBeInTheDocument();
    });
  });
});
