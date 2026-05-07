import { useEffect, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import useApiFetch from './useApiFetch';
import { useWatchlist } from '../context/WatchlistContext';

const ACCENT = '#f59e0b';
const ACCENT_DARK = '#92400e';
const WHITE = '#FFFFFF';
const SURFACE = 'rgba(255,255,255,0.92)';
const CARD = 'rgba(255,255,255,0.98)';

const DetailPage = ({ showToast }) => {
  const { id } = useParams();
  const location = useLocation();
  const isTVShow = location.pathname.includes('/tv-show/');

  const { data, loading, error } = useApiFetch({ i: id, plot: 'full' });

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    if (error) showToast?.(error, 'error');
  }, [error, showToast]);

  const inWatchlist = useMemo(() => isInWatchlist(id), [isInWatchlist, id]);

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(id);
      showToast?.('Removed from watchlist', 'success');
      return;
    }

    addToWatchlist({
      imdbID: id,
      Title: data?.Title || 'Unknown title',
      Type: data?.Type || (isTVShow ? 'series' : 'movie'),
      Poster: data?.Poster || '',
      Year: data?.Year || '',
    });

    showToast?.('Added to watchlist', 'success');
  };

  const details = data || {};
  const poster =
    details.Poster && details.Poster !== 'N/A'
      ? details.Poster
      : 'https://via.placeholder.com/500x750?text=No+Poster';

  const genres = details.Genre?.split(',').map((genre) => genre.trim()) || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-4 md:flex-row items-start">
        <Link to="/" className="font-semibold" style={{ color: ACCENT_DARK }}>
          ← Back to search
        </Link>

        <div className="flex-1" />

        <span
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
          style={{ background: ACCENT, color: WHITE }}
        >
          {isTVShow ? 'TV Show Details' : 'Movie Details'}
        </span>
      </div>

      {loading && (
        <p className="font-semibold" style={{ color: ACCENT_DARK }}>
          Loading details...
        </p>
      )}

      {error && (
        <p
          className="p-4 rounded-lg border font-medium"
          style={{ borderColor: ACCENT, color: ACCENT_DARK, background: SURFACE }}
        >
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,_1fr)] items-start">
          <div className="overflow-hidden rounded-[2rem] border" style={{ borderColor: ACCENT, background: CARD }}>
            <img src={poster} alt={details.Title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border" style={{ borderColor: ACCENT, background: CARD, padding: '2rem' }}>
              <div className="space-y-5">
                <h1 className="text-4xl font-extrabold" style={{ color: ACCENT_DARK }}>
                  {details.Title}
                </h1>
                <p className="text-lg leading-8" style={{ color: ACCENT_DARK, opacity: 0.95 }}>
                  {details.Plot}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border p-5" style={{ borderColor: ACCENT }}>
                  <p className="text-sm uppercase tracking-wide font-semibold" style={{ color: ACCENT_DARK }}>
                    Release date
                  </p>
                  <p className="mt-2 text-lg font-semibold" style={{ color: ACCENT_DARK }}>
                    {details.Released || details.Year || 'N/A'}
                  </p>
                </div>

                <div className="rounded-2xl border p-5" style={{ borderColor: ACCENT }}>
                  <p className="text-sm uppercase tracking-wide font-semibold" style={{ color: ACCENT_DARK }}>
                    User rating
                  </p>
                  <p className="mt-2 text-lg font-semibold" style={{ color: ACCENT_DARK }}>
                    {details.imdbRating || 'N/A'} / 10
                  </p>
                </div>

                <div className="rounded-2xl border p-5 sm:col-span-2" style={{ borderColor: ACCENT }}>
                  <p className="text-sm uppercase tracking-wide font-semibold" style={{ color: ACCENT_DARK }}>
                    Genres
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {genres.length > 0 ? (
                      genres.map((genre) => (
                        <span
                          key={genre}
                          className="rounded-full px-3 py-1 text-sm font-semibold"
                          style={{ background: ACCENT, color: WHITE }}
                        >
                          {genre}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: ACCENT_DARK, opacity: 0.9 }}>N/A</span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border p-5 sm:col-span-2" style={{ borderColor: ACCENT }}>
                  <p className="text-sm uppercase tracking-wide font-semibold" style={{ color: ACCENT_DARK }}>
                    Cast
                  </p>
                  <p className="mt-2" style={{ color: ACCENT_DARK, opacity: 0.95 }}>
                    {details.Actors || 'Cast information not available.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleWatchlist}
                className="mt-8 w-full rounded-2xl px-6 py-4 font-semibold transition"
                style={{
                  background: inWatchlist ? WHITE : ACCENT,
                  color: inWatchlist ? ACCENT_DARK : WHITE,
                  border: `1px solid ${ACCENT}`,
                }}
              >
                {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;

