import Pagination from '@/components/Pagination';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <Pagination currentPage={1} setCurrentPage={() => {}} pages={5} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    render(<Pagination currentPage={1} setCurrentPage={() => {}} pages={5} />);
    const pageButtons = screen.getAllByRole('button');
    // 5 pages + 2 for previous and next buttons
    expect(pageButtons).toHaveLength(7);
  });

  it('calls setCurrentPage with the correct page number', () => {
    const setCurrentPageMock = vi.fn();
    render(
      <Pagination
        currentPage={1}
        setCurrentPage={setCurrentPageMock}
        pages={5}
      />
    );
    const secondPageButton = screen.getByLabelText('go to page 2');
    fireEvent.click(secondPageButton);
    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });

  it('increments page number on next button click', async () => {
    const setCurrentPage = vi.fn();
    render(
      <Pagination currentPage={1} setCurrentPage={setCurrentPage} pages={5} />
    );

    const nextButton = screen.getByLabelText('go to next page');
    await userEvent.click(nextButton);

    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('decrements page number on previous button click', async () => {
    const setCurrentPage = vi.fn();
    render(
      <Pagination currentPage={2} setCurrentPage={setCurrentPage} pages={5} />
    );

    const prevButton = screen.getByLabelText('go to previous page');
    await userEvent.click(prevButton);

    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  it('disables the previous button on the first page', () => {
    render(<Pagination currentPage={1} setCurrentPage={() => {}} pages={5} />);
    const previousButton = screen.getByLabelText('go to previous page');
    expect(previousButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<Pagination currentPage={5} setCurrentPage={() => {}} pages={5} />);
    const nextButton = screen.getByLabelText('go to next page');
    expect(nextButton).toBeDisabled();
  });
});
