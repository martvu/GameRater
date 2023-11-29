import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Rating, { StarRating } from '@/components/Rating';

describe('Rating Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Rating rating={3} numRatings={100} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders star rating based on provided rating', () => {
    render(<Rating rating={3} numRatings={100} />);
    // Assuming the StarRating component displays the rating value as text
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('displays the correct number of user ratings', () => {
    render(<Rating rating={4} numRatings={25} />);
    expect(screen.getByText('Based on 25 user ratings')).toBeInTheDocument();
  });

  it('handles singular form for one rating', () => {
    render(<Rating rating={5} numRatings={1} />);
    expect(screen.getByText('Based on 1 user rating')).toBeInTheDocument();
  });
});

describe('StarRating Component', () => {
  it('renders correctly with initial rating', () => {
    render(<StarRating rating={3} numRatings={100} disabled={false} />);
    expect(screen.getAllByText('★')).toHaveLength(3);
    expect(screen.getAllByText('☆')).toHaveLength(2);
  });

  it('calls onChange with the correct rating on click', async () => {
    const onChangeMock = vi.fn();
    render(<StarRating rating={2} onChange={onChangeMock} disabled={false} />);
    const thirdStar = screen.getAllByText('☆')[0];
    await userEvent.click(thirdStar);
    expect(onChangeMock).toHaveBeenCalledWith(3);
  });

  it('shows correct number of filled stars on hover', async () => {
    render(<StarRating rating={2} disabled={false} />);
    const fourthStar = screen.getAllByText('☆')[1];
    await userEvent.click(fourthStar);
    await waitFor(() => {
      expect(screen.getAllByText('★')).toHaveLength(4);
    });
  });

  it('does not allow interaction when disabled', async () => {
    render(<StarRating rating={3} disabled={true} />);
    const fourthStar = screen.getAllByText('☆')[0];
    await userEvent.click(fourthStar);
    expect(screen.getAllByText('★')).toHaveLength(3); // Rating should not change
  });

  it('resets rating on double click', async () => {
    render(<StarRating rating={3} disabled={false} />);
    const thirdStar = screen.getAllByText('★')[2];
    await userEvent.dblClick(thirdStar);
    expect(screen.getAllByText('☆')).toHaveLength(5); // All stars should be empty
  });

  it('reverts to original rating on mouse leave', async () => {
    render(<StarRating rating={2} disabled={false} />);

    const starToHover = screen.getAllByText('☆')[0];
    await userEvent.hover(starToHover);
    await userEvent.unhover(starToHover);

    expect(screen.getAllByText('★')).toHaveLength(2); // Check if it reverts to original rating
  });
});
