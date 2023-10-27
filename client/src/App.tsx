import './index.css';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameListPage from './pages/GameListPage';
import GameDetailPage from './pages/GameDetailPage';
import { ReviewForm } from './components/ReviewForm';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Check if the UUID is already in localStorage
    let userID: string | null = localStorage.getItem('userID');
    // If not, generate a new UUID and save it to localStorage
    if (!userID) {
      userID = uuidv4();
      localStorage.setItem('userID', userID);
    }
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/" element={<GameListPage />} />
            <Route path="/review" element={<ReviewForm />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
