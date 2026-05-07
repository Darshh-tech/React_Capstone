import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import MovieCard from './MovieCard';
import { useWatchlist } from '../context/WatchlistContext';

const ACCENT = '#f59e0b';
const ACCENT_DARK = '#92400e';
const WHITE = '#FFFFFF';
const SURFACE = 'rgba(255,255,255,0.92)';
const CARD = 'rgba(255,255,255,0.98)';

const Watchlist = ({ showToast }) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const userName = user?.name || user?.username || 'Guest';

  const handleMockLogin = () => {
    const result = login('admin', 'password');
    showToast?.(result.success ? 'Logged in' : result.error, result.success ? 'success' : 'error');
  };

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      logout();
      return;
    }
    handleMockLogin();
  };

  const handleRemove = (imdbID) => {
    removeFromWatchlist(imdbID);
    showToast?.('Removed from watchlist', 'success');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="rounded-[2rem] border" style={{ borderColor: ACCENT, background: ACCENT }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6">
          <Link to="/" className="font-semibold" style={{ color: WHITE }}>
            ← Back to search
          </Link>

          <button
            type="button"
            onClick={handleAuthToggle}
            className="rounded-2xl px-5 py-3 font-semibold transition"
            style={{ background: WHITE, color: ACCENT_DARK, border: `1px solid ${ACCENT}` }}
          >
            {isAuthenticated ? 'Logout' : 'Mock Login'}
          </button>
        </div>

        <div className="pb-6 text-center">
          <h1 className="text-4xl font-black tracking-tight" style={{ color: WHITE }}>
            My Watchlist
          </h1>
          <p className="mt-3 text-lg" style={{ color: WHITE, opacity: 0.95 }}>
            Welcome back, {userName}.
          </p>
        </div>
      </header>

      {watchlist.length === 0 ? (
        <div className="rounded-[1.75rem] border p-10 text-center" style={{ borderColor: ACCENT, background: SURFACE }}>
          <p className="text-xl font-semibold" style={{ color: ACCENT_DARK }}>
            Your watchlist is empty
          </p>
          <p className="mt-3" style={{ color: ACCENT_DARK, opacity: 0.85 }}>
            Add movies and TV shows from the search or detail pages to build your queue.
          </p>
          <Link
            to="/"
            className="inline-flex mt-8 rounded-full px-6 py-3 font-semibold transition"
            style={{ background: ACCENT, color: WHITE, border: `1px solid ${ACCENT}` }}
          >
            Browse Movies & TV Shows
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-[1.75rem] border p-6 text-center" style={{ borderColor: ACCENT, background: SURFACE }}>
            <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: ACCENT_DARK }}>
              {watchlist.length} item{watchlist.length !== 1 ? 's' : ''} in your watchlist
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {watchlist.map((item) => (
              <div key={item.imdbID} className="relative rounded-3xl border" style={{ borderColor: ACCENT, background: CARD }}>
                <MovieCard item={item} />
                <button
                  type="button"
                  onClick={() => handleRemove(item.imdbID)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full font-bold transition"
                  style={{
                    background: ACCENT,
                    color: WHITE,
                    border: `1px solid ${ACCENT}`,
                  }}
                  title="Remove from watchlist"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;


