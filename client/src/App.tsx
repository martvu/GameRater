import './index.css';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameListPage from './pages/GameListPage';
import GameDetailPage from './pages/GameDetailPage';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/" element={<GameListPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
