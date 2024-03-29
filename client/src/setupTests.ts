import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

//mock ResizeObserver to avoid errors in tests
class MockResizeObserver {
  constructor(public callback: ResizeObserverCallback) {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
