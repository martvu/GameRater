import './index.css';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameListPage from './pages/GameListPage';
import GameDetailPage from './pages/GameDetailPage';
import { ReviewForm } from './components/ReviewForm';
import { Toaster } from '@/components/ui/toaster.tsx';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router basename="/project2">
          <Routes>
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/" element={<GameListPage />} />
            <Route path="search/:keyword" element={<GameListPage />} />
            <Route path="/review" element={<ReviewForm />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
