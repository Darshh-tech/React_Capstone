import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WatchlistContext = createContext(null);

const WATCHLIST_KEY = 'cinemaHubWatchlist';

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within a WatchlistProvider');
  return ctx;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');
    if (Array.isArray(saved)) setWatchlist(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item) => {
    setWatchlist((current) => {
      const exists = current.some((x) => x.imdbID === item.imdbID);
      if (exists) return current;
      return [...current, item];
    });
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist((current) => current.filter((x) => x.imdbID !== imdbID));
  };

  const isInWatchlist = useMemo(
    () => (imdbID) => watchlist.some((x) => x.imdbID === imdbID),
    [watchlist]
  );


  const value = useMemo(
    () => ({ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }),
    [watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist]
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};

