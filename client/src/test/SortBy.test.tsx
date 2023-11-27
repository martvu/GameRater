import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SortBy from '@/components/SortBy';
import * as recoil from 'recoil';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';

/* Need to mock PointerEvent for the SortBy component tests to work 
because Radix UI uses PointerEvent */
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

// Mock localStorage
type LocalStorageMock = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  clear: () => void;
};

// Mock Recoil state
vi.mock('recoil', async () => {
  const actual: typeof recoil = await vi.importActual('recoil');
  return {
    ...actual, // Include all actual module exports
    useRecoilState: vi
      .fn<[], [unknown, (val: unknown) => void]>()
      .mockReturnValue([{}, vi.fn()]),
    useSetRecoilState: vi
      .fn<[], (val: unknown) => void>()
      .mockReturnValue(vi.fn()),
  };
});

const renderSortBy = () => {
  return render(
    <RecoilRoot>
      <SortBy />
    </RecoilRoot>
  );
};

describe('SortBy Component', () => {
  let localStorageMock: LocalStorageMock;
  beforeEach(() => {
    localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => {}),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('renders correctly', async () => {
    renderSortBy();
    expect(screen.getByText('Sort By')).toBeInTheDocument();
  });

  it('matches the snapshot', async () => {
    const { asFragment } = renderSortBy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should open the select menu when clicked', async () => {
    renderSortBy();
    const trigger = screen.getByTestId('sort-by-select');
    await userEvent.click(trigger);
    expect(screen.getByText('Release Date Desc')).toBeInTheDocument();
  });

  it('should change the selected value when clicked', async () => {
    renderSortBy();
    const trigger = screen.getByTestId('sort-by-select');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(screen.getByTestId('release-date-desc'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await userEvent.click(screen.getByTestId('release-date-asc'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await userEvent.click(screen.getByTestId('a-z'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await userEvent.click(screen.getByTestId('z-a'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await userEvent.click(screen.getByTestId('metascore'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await userEvent.click(screen.getByTestId('user-rating'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
