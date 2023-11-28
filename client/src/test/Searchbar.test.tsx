import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { RecoilRoot } from 'recoil';
import { allMocks } from '@/mocks/mockQueries';
import userEvent from '@testing-library/user-event';
import Searchbar from '@/components/Searchbar.tsx';
import { MemoryRouter } from 'react-router-dom';

interface SearchbarOptions {
  showFullWidthSearch?: boolean;
}

function renderSearchbar({
  showFullWidthSearch = false,
}: SearchbarOptions = {}) {
  return render(
    <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot>
        <MemoryRouter initialEntries={['/project2']}>
          <Searchbar showFullWidthSearch={showFullWidthSearch} />
        </MemoryRouter>
      </RecoilRoot>
    </MockedProvider>
  );
}

describe('Searchbar Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = renderSearchbar();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    renderSearchbar();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('display dropdown when input has input', async () => {
    renderSearchbar();
    await userEvent.type(screen.getByTestId('search-input'), 'example');
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
      expect(screen.getByText('Example Game 2')).toBeInTheDocument();
    });
  });

  it('allows navigation through the dropdown using keyboard', async () => {
    renderSearchbar();

    // Simulate typing to trigger the dropdown
    await userEvent.type(screen.getByTestId('search-input'), 'example');

    // Wait for the dropdown to appear and display items
    await waitFor(() => {
      expect(screen.getByText('Example Game')).toBeInTheDocument();
    });
    const input = screen.getByTestId('search-input');
    const dropdownItems = screen.getAllByRole('listitem'); // This assumes each dropdown item has a role='listitem'

    // Ensure the input is initially focused
    expect(input).toHaveFocus();

    // Simulate pressing ArrowDown to move focus to the first dropdown item
    await userEvent.keyboard('{ArrowDown}');

    // Check if the first dropdown item is focused
    expect(dropdownItems[0]).toHaveFocus();

    // Simulate pressing ArrowDown again to move focus to the second dropdown item
    await userEvent.keyboard('{ArrowDown}');

    // Check if the second dropdown item is focused
    expect(dropdownItems[1]).toHaveFocus();

    // Simulate pressing ArrowUp to move focus back to the first dropdown item
    await userEvent.keyboard('{ArrowUp}');

    // Check if the first dropdown item is focused again
    expect(dropdownItems[0]).toHaveFocus();

    fireEvent.click(screen.getAllByTestId('search-item')[0]);
    // Simulate pressing Enter to navigate to the first dropdown item
    await userEvent.keyboard('{Enter}');

    // Check if the dropdown is hidden
    expect(screen.queryByText('Example Game')).not.toBeInTheDocument();
  });
});
