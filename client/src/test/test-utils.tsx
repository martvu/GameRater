import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { RecoilRoot } from 'recoil';

interface TestPageRenderOptions {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks: any[];
  initialRoutes?: string[];
}

export function testPageRender(
  ui: React.ReactElement,
  options: TestPageRenderOptions
) {
  return render(
    <MockedProvider mocks={options.mocks} addTypename={false}>
      <RecoilRoot>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MemoryRouter initialEntries={options.initialRoutes || ['/project2']}>
            {ui}
          </MemoryRouter>
        </ThemeProvider>
      </RecoilRoot>
    </MockedProvider>
  );
}
