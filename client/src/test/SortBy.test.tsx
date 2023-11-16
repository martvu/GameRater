import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortBy from '@/components/SortBy';
import * as recoil from 'recoil';

// TypeScript type for the mock
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
    useRecoilState: vi.fn<[], [unknown, (val: unknown) => void]>().mockReturnValue([{}, vi.fn()]),
    useSetRecoilState: vi.fn<[], (val: unknown) => void>().mockReturnValue(vi.fn()),
  };
});

describe('SortBy Component', () => {
  let localStorageMock: LocalStorageMock;
  beforeEach(() => {
    localStorageMock = {
      getItem: vi.fn((key: string) => null),
      setItem: vi.fn((key: string, value: string) => {}),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('renders correctly', () => {
    render(<SortBy />);
    expect(screen.getByText('Sort By')).toBeInTheDocument();
  });
});
