import './App.css';
import { useCallback, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Toast from './Components/Toast';

import Home from './Components/Home';
import Movies from './Components/Movies';
import TvShows from './Components/TvShows';
import Search from './Components/Search';

import DetailPage from './Components/DetailPage';
import Watchlist from './Components/Watchlist';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const timeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setToast({ visible: true, message, type });
    timeoutRef.current = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }));
    }, 2800);
  }, []);

  return (
    <AuthProvider>
      <WatchlistProvider>
        <Router>
          <Header showToast={showToast} />
          <div className="min-h-screen bg-amber-50 text-neutral-900 p-6 pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TvShows />} />
              <Route path="/search" element={<Search showToast={showToast} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movie/:id" element={<DetailPage showToast={showToast} />} />
              <Route path="/tv-show/:id" element={<DetailPage showToast={showToast} />} />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist showToast={showToast} />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
            <Toast visible={toast.visible} message={toast.message} type={toast.type} />
          </div>
        </Router>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
