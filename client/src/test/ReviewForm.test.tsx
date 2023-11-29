import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { RecoilRoot } from 'recoil';
import { ReviewForm } from '@/components/ReviewForm';
import { allMocks } from '@/mocks/mockQueries';
import { vi } from 'vitest';
import { userState } from '@/state/atoms';

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}
//eslint-disable-next-line @typescript-eslint/no-explicit-any
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

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

const mockUser = {
  _id: '1',
  username: 'testUser',
  favorites: [],
  reviews: [],
};

const renderReviewForm = () => {
  return render(
    <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot
        initializeState={({ set }) => {
          set(userState, mockUser);
        }}
      >
        <ReviewForm />
      </RecoilRoot>
    </MockedProvider>
  );
};
describe('ReviewForm', () => {
  it('matches the snapshot', async () => {
    const { asFragment } = renderReviewForm();

    await waitFor(() => {
      expect(screen.getByText('Submit Review')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    renderReviewForm();

    await waitFor(() => {
      const titleInput = screen.getByTestId('review-title-input');
      expect(titleInput).toBeInTheDocument();
      expect(screen.getByText('Submit Review')).toBeInTheDocument();
    });
  });

  it('can be submitted', async () => {
    renderReviewForm();
    // Fill out the form
    const titleInput = await screen.findByTestId('review-title-input');
    await userEvent.type(titleInput, 'Great Game');
    const submitButton = await screen.findByText('Submit Review');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText('Content must be at least 4 characters.')
      ).toBeInTheDocument();
      expect(screen.getByText('Please select a platform.')).toBeInTheDocument();
      expect(screen.getByText('Please select a rating.')).toBeInTheDocument();
    });
    const platformSelect = await screen.findByTestId('review-platform-select');
    await userEvent.click(platformSelect);
    await userEvent.click(screen.getAllByText('PC (Microsoft Windows)')[1]);
    const contentInput = await screen.findByTestId('review-content-input');
    await userEvent.type(contentInput, 'This is a great game because...');
    const ratingInput = await screen.findAllByTestId('review-star');
    await userEvent.click(ratingInput[4]);
    // Submit the form
    fireEvent.click(submitButton);
  });
});
