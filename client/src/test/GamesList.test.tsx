import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { allMocks } from '../mocks/mockQueries';
import GamesList from '@/components/GamesList';
import { MockedProvider } from '@apollo/client/testing';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

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

const renderGamesList = () => {
  return render(
    <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MemoryRouter initialEntries={['/project2']}>
            <GamesList />
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>
    </MockedProvider>
  );
};

describe('GameList Component', () => {
  it('renders the GamesList component with mocked GraphQL data', async () => {
    renderGamesList();
    // Wait for the mocked data to be displayed  
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
      expect(screen.getByText('1 results')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('85')).toBeInTheDocument();
    });

  });
});
