import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ showToast }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const navItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Movies', to: '/movies' },
      { label: 'TV Shows', to: '/tv-shows' },
      { label: 'Watchlist', to: '/watchlist' },
    ],
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      showToast?.('Please enter a search query.', 'error');
      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-amber-100/80 backdrop-blur-xl border-b border-amber-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-amber-900 font-black tracking-tight text-lg sm:text-xl">
                Cinema Hub
              </Link>

              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((it) => (
                  <Link
                    key={it.to}
                    to={it.to}
                    className="px-3 py-2 text-sm font-semibold text-amber-900/70 hover:text-amber-900 transition rounded-full hover:bg-amber-200 border border-transparent hover:border-amber-300"
                  >
                    {it.label}
                  </Link>
                ))}
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 max-w-xl hidden sm:flex items-center gap-2">
              <div className="relative w-full">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies & TV shows..."
                  className="w-full rounded-full border border-amber-200 bg-amber-50 px-5 py-3 text-amber-950 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 placeholder:text-amber-900/50"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-amber-400"
              >
                Search
              </button>
            </form>

            <div className="sm:hidden">
              <button
                type="button"
                className="rounded-full border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900/70 hover:bg-amber-200 transition"
                onClick={() => showToast?.('Use the search on bigger screens.', 'info')}
              >
                Menu
              </button>
            </div>
          </div>

          <div className="mt-3 sm:hidden">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies & TV shows..."
                className="w-full rounded-full border border-amber-200 bg-amber-50 px-5 py-3 text-amber-950 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 placeholder:text-amber-900/50"
              />
              <button
                type="submit"
                className="rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-amber-50 transition hover:bg-amber-400"
              >
                Go
              </button>
            </form>

            <nav className="mt-3 flex flex-wrap items-center gap-2">
              {navItems.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  className="px-3 py-2 text-sm font-semibold text-amber-900/70 hover:text-amber-900 transition rounded-full border border-amber-300/70 hover:bg-amber-200"
                >
                  {it.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
