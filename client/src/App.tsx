import './index.css';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameListPage from './pages/GameListPage';
import GameDetailPage from './pages/GameDetailPage';
import { ReviewForm } from './components/ReviewForm';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

function App() {
  const [userID, setUserID] = useState<string>('');

  useEffect(() => {
    // Check if the UUID is already in localStorage
    const storedUserID: string | null = localStorage.getItem('userID');
    // If not, generate a new UUID and save it to localStorage
    if (!storedUserID) {
      const newUserID = uuidv4();
      setUserID(newUserID);
      localStorage.setItem('userID', newUserID);
    } else {
      setUserID(storedUserID);
    }
    console.log(userID);
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
