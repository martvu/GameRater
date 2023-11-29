import { render, screen, waitFor } from '@testing-library/react';
import GameDetailPage from '@/pages/GameDetailPage';
import { vi, describe, it } from 'vitest';
import { allMocks } from '../mocks/mockQueries';
import { MockedProvider } from '@apollo/client/testing/react/MockedProvider';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';

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
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

const renderGameDetailPage = () => {
  return render(
    <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MemoryRouter initialEntries={['/project2']}>
            <GameDetailPage />
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>
    </MockedProvider>
  );
};

describe('GameDetailPage Component', () => {
  it('matches the snapshot', async () => {
    const { asFragment } = renderGameDetailPage();

    // Wait for any asynchronous operations to complete
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the GameDetailPage with mocked GraphQL data', async () => {
    renderGameDetailPage();
    // Wait for the mocked data to be displayed
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
    });

    // Test the game cover section renders the correct data
    expect(screen.getByText('Add Review')).toBeInTheDocument();
    expect(screen.getByText('Based on 2 user ratings')).toBeInTheDocument();
    expect(screen.getByText('4.5/5')).toBeInTheDocument();

    // Test the details section renders the correct data
    expect(
      screen.getByText('This is an example game summary.')
    ).toBeInTheDocument();
    expect(screen.getByText('Platforms:')).toBeInTheDocument();
    expect(screen.getAllByText('PC')).toHaveLength(3);
    expect(screen.getByText('Genres:')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();

    // Test the ReviewCard section renders the correct data
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Great Game')).toBeInTheDocument();
    expect(
      screen.getByText('This is a great game because...')
    ).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();

    // Test the modeToggle button
  });
});
