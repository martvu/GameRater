import './index.css';
import { ThemeProvider } from './components/theme/ThemeProvider';
import GameListPage from './pages/GameListPage';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <GameListPage />
      </ThemeProvider>
    </>
  );
}

export default App;
