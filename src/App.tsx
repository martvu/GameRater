import './index.css';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameListPage from './pages/GameListPage';
import GameDetailPage from './pages/GameDetailPage';
import { ReviewForm } from './components/ReviewForm';
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/" element={<GameListPage />} />
            <Route path="/review" element={<ReviewForm/>} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
