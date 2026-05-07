import useApiFetch from './useApiFetch';
import MovieCard from './MovieCard';

const Movies = () => {
  const { data, loading, error } = useApiFetch({
    s: 'popular',
    type: 'movie',
  });

  return (
    <div className="space-y-8 pt-20">
      <div className="max-w-6xl mx-auto space-y-4">
        <p className="text-sm uppercase tracking-[0.22em] text-amber-700">Movies</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
          Popular picks
        </h1>
        <p className="text-neutral-700">
          Browse a curated set of movie results. Use search for more specific titles.
        </p>
      </div>

      {loading && (
        <p className="text-center text-neutral-700 animate-pulse">Loading movies...</p>
      )}

      {error && (
        <p className="max-w-6xl mx-auto rounded-3xl border border-amber-300/60 bg-amber-50 p-4 text-center text-amber-900">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(data?.Search || []).slice(0, 12).map((m) => (
            <MovieCard key={m.imdbID} item={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
