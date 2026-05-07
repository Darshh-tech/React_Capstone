import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = React.memo(({ item }) => {
  const placeholder = 'https://via.placeholder.com/400x600?text=No+Image';

  const rawPoster = item?.Poster;
  const hasValidPoster =
    typeof rawPoster === 'string' && rawPoster.trim() !== '' && rawPoster !== 'N/A';

  const imageUrl = hasValidPoster ? rawPoster : placeholder;
  const routePath =
    item?.Type === 'series' ? `/tv-show/${item.imdbID}` : `/movie/${item.imdbID}`;

  return (
    <Link
      to={routePath}
      className="group block w-full overflow-hidden rounded-[1.5rem] border border-slate-700/70 bg-slate-950/95 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-45px_rgba(248,195,0,0.35)]"
    >
      <div className="relative h-60 overflow-hidden bg-slate-500 sm:h-64">
        <img
          src={imageUrl}
          alt={item?.Title || 'Untitled'}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== placeholder) target.src = placeholder;
          }}
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="truncate text-base font-semibold text-slate-100">{item?.Title}</h3>
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
          <span>{item?.Year}</span>
          <span className="rounded-full bg-amber-400/15 px-2 py-1 text-amber-300 uppercase tracking-[0.18em]">
            {item?.Type}
          </span>
        </div>
      </div>
    </Link>
  );
});

export default MovieCard;

