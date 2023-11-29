import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { RecoilRoot } from 'recoil';
import Filters from '@/components/Filters'; // Adjust the path to your Filters component
import { allMocks } from '@/mocks/mockQueries';
import userEvent from '@testing-library/user-event';
import { platformsListState, genresListState } from '@/state/atoms';

interface RenderFiltersOptions {
  mockPlatformList?: number[];
  mockGenreList?: number[];
}

function renderFilters({
  mockPlatformList = [],
  mockGenreList = [],
}: RenderFiltersOptions = {}) {
  return render(
    <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot
        initializeState={({ set }) => {
          set(platformsListState, mockPlatformList);
          set(genresListState, mockGenreList);
        }}
      >
        <Filters />
      </RecoilRoot>
    </MockedProvider>
  );
}

describe('Filters Component', () => {
  it('matches the snapshot', async () => {
    const { asFragment } = renderFilters();

    await waitFor(() => {
      expect(screen.getByText('Filter By')).toBeInTheDocument();
      expect(screen.getByText('platforms')).toBeInTheDocument();
      expect(screen.getByText('genres')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly and handles toggle collapse', async () => {
    renderFilters();
    expect(screen.getByText('Filter By')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('platforms')).toBeInTheDocument();
      expect(screen.getByText('genres')).toBeInTheDocument();
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(8);
    });

    // Test toggle collapse
    await userEvent.click(screen.getByLabelText('toggle filters'));

    await waitFor(() => {
      expect(screen.queryByText('platforms')).not.toBeInTheDocument();
      expect(screen.queryByText('genres')).not.toBeInTheDocument();
      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes).toHaveLength(0);
    });
  });

  it('renders correctly when platformList and genreList is not empty', async () => {
    renderFilters({ mockPlatformList: [1, 2, 3], mockGenreList: [1] });
    await waitFor(() => {
      expect(screen.getByText('platforms')).toBeInTheDocument();
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4);
    });
  });

  it('checks the checkboxes correctly', async () => {
    renderFilters();
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(8);
    });
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    const genreCheckbox = screen.getByTestId('filter-item-Genre 1');
    await userEvent.click(genreCheckbox);
    await waitFor(() => {
      expect(checkboxes[0]).toBeChecked();
      expect(genreCheckbox).toBeChecked();
    });
  });
});
