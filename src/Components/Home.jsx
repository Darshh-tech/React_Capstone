import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-10 pt-20">
      <header className="rounded-[2rem] border border-amber-200/70 bg-white/80 p-12 shadow-[0_28px_90px_-45px_rgba(120,53,15,0.18)] backdrop-blur-xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-800/90">Cinematic Browse</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-neutral-900 sm:text-6xl">
            Discover movies & TV in style.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-700 sm:text-lg">
            Use the search bar to find titles fast, build your watchlist, and enjoy a cinematic media
            experience.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/movies"
            className="rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-amber-950 shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition"
          >
            Explore Movies
          </Link>

          <Link
            to="/tv-shows"
            className="rounded-full border border-amber-400/40 bg-amber-50 px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-amber-800 transition hover:bg-amber-100"
          >
            Explore TV Shows
          </Link>

          <Link
            to="/watchlist"
            className="rounded-full border border-amber-300/60 bg-amber-50 px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-amber-900 transition hover:bg-amber-100"
          >
            My Watchlist
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-amber-200/70 bg-white/80 p-8 shadow-[0_28px_90px_-45px_rgba(120,53,15,0.18)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-800">Curated Picks</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900">Movies</h2>
          <p className="mt-3 text-neutral-700">
            Browse a curated set of movie results. For specific titles, use Search.
          </p>
          <Link
            to="/movies"
            className="mt-6 inline-flex text-sm font-semibold text-amber-800 hover:text-amber-700 transition"
          >
            View movies →
          </Link>
        </div>

        <div className="rounded-[2rem] border border-amber-200/70 bg-white/80 p-8 shadow-[0_28px_90px_-45px_rgba(120,53,15,0.18)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-800">Curated Picks</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900">TV Shows</h2>
          <p className="mt-3 text-neutral-700">
            Explore popular series with an easy, scrollable card grid.
          </p>
          <Link
            to="/tv-shows"
            className="mt-6 inline-flex text-sm font-semibold text-amber-800 hover:text-amber-700 transition"
          >
            View TV shows →
          </Link>
        </div>

        <div className="rounded-[2rem] border border-amber-200/70 bg-white/80 p-8 shadow-[0_28px_90px_-45px_rgba(120,53,15,0.18)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-800">Your Queue</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900">Watchlist</h2>
          <p className="mt-3 text-neutral-700">
            Save titles from detail pages. Your watchlist is persisted in localStorage.
          </p>
          <Link
            to="/watchlist"
            className="mt-6 inline-flex text-sm font-semibold text-amber-800 hover:text-amber-700 transition"
          >
            Open watchlist →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
