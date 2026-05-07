import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useApiFetch from './useApiFetch';
import MovieCard from './MovieCard';

const Search = ({ showToast }) => {
  const location = useLocation();

  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('query') || '';
  }, [location.search]);

  const trimmedQuery = query.trim();
  const shouldFetch = trimmedQuery.length > 0;

  const { data, loading, error } = useApiFetch(
    useMemo(
      () =>
        shouldFetch
          ? {
              s: trimmedQuery,
              type: 'movie',
            }
          : {},
      [shouldFetch, trimmedQuery]
    )
  );

  const [didWarn, setDidWarn] = useState(false);
  useEffect(() => {
    if (!shouldFetch && !didWarn) {
      showToast?.('Please enter a search query.', 'error');
      setDidWarn(true);
    }
  }, [shouldFetch, didWarn, showToast]);

  return (
    <div className="space-y-8 pt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-amber-300">Search</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-black">
              Results for <span className="text-amber-300">"{trimmedQuery || '...'}"</span>
            </h1>
          </div>
          <Link
            to="/"
            className="inline-flex rounded-full border border-slate-700/80 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
          >
            ← Back Home
          </Link>
        </div>

        {loading && (
          <p className="text-slate-300 font-semibold animate-pulse">🔍 Searching the vault...</p>
        )}

        {error && (
          <p className="rounded-3xl border border-amber-400/40 bg-slate-950/80 px-6 py-4 text-center text-amber-300">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {data?.Search?.length ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.Search.slice(0, 12).map((movie) => (
                  <MovieCard key={movie.imdbID} item={movie} />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-slate-700/60 bg-slate-900/70 p-10 text-center shadow-lg shadow-slate-950/50">
                <p className="text-xl font-semibold text-amber-300">No results</p>
                <p className="mt-3 text-slate-400">Try a different keyword.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
