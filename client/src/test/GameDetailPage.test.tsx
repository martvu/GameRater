import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import GameDetailPage from '@/pages/GameDetailPage';
import { vi, describe, it } from 'vitest';
import { allMocks as mocks } from '../mocks/mockQueries';
import { testPageRender } from './test-utils';
import userEvent from '@testing-library/user-event';

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
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

describe('GameDetailPage Component', () => {
  it('renders the GamesList component with mocked GraphQL data', async () => {
    testPageRender(<GameDetailPage />, { mocks });
    // Wait for the mocked data to be displayed
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
      expect(screen.getByText('Reviews')).toBeInTheDocument();
      expect(screen.getByText('Add Review')).toBeInTheDocument();
      expect(screen.getByText('Based on 2 user ratings')).toBeInTheDocument();
      expect(screen.getByText('4.5/5')).toBeInTheDocument();
    });
  });

  it('prompts sign in when trying to add a review', async () => {
    testPageRender(<GameDetailPage />, { mocks });
    const addReviewButton = await screen.findByText('Add Review');
    userEvent.click(addReviewButton);

    await waitFor(() => {
      expect(screen.getByText('Please sign in to review this game!')).toBeInTheDocument();
    });
  });
});
