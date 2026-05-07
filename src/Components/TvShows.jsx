import { useEffect, useState } from 'react';
import useApiFetch from './useApiFetch';
import MovieCard from './MovieCard';

const TvShows = () => {
  const [query, setQuery] = useState('harry potter');

  const { data, loading, error } = useApiFetch({
    s: query,
    type: 'series',
  });

  useEffect(() => {
    if (error && typeof error === 'string') {
      const normalized = error.toLowerCase();
      if (normalized.includes('series not found') && query !== 'tv') {
        setQuery('tv');
      }
    }
  }, [error, query]);

  return (
    <div className="space-y-8 pt-20">
      <div className="max-w-6xl mx-auto space-y-4">
        <p className="text-sm uppercase tracking-[0.22em] text-amber-700">TV Shows</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
          Popular series
        </h1>
        <p className="text-neutral-700">
          Browse a curated set of TV results. For exact titles, use search.
        </p>
      </div>

      {loading && (
        <p className="text-center text-neutral-700 animate-pulse">Loading TV...</p>
      )}

      {error && (
        <p className="max-w-6xl mx-auto rounded-3xl border border-amber-300/60 bg-amber-50 p-4 text-center text-amber-900">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(data?.Search || []).slice(0, 12).map((item) => (
            <MovieCard key={item.imdbID} item={{ ...item, Type: 'series' }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TvShows;
