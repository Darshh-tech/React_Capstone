import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(credentials.username, credentials.password);
    if (!result.success) {
      setError(result.error);
      return;
    }

    navigate('/watchlist');
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const ACCENT = '#f59e0b';
  const ACCENT_DARK = '#92400e';
  const WHITE = '#FFFFFF';
  const SURFACE = 'rgba(255,255,255,0.92)';
  const CARD = 'rgba(255,255,255,0.98)';

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: SURFACE }}>
      <div
        className="w-full max-w-md rounded-[2rem] border p-8 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.15)]"
        style={{ borderColor: ACCENT, background: CARD }}
      >
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.28em] font-semibold" style={{ color: ACCENT_DARK }}>
            Cinema access
          </p>
          <h1 className="mt-4 text-4xl font-black" style={{ color: ACCENT_DARK }}>
            Sign in
          </h1>
          <p className="mt-2" style={{ color: ACCENT_DARK, opacity: 0.85 }}>
            Enter your credentials to open the watchlist.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold mb-2" style={{ color: ACCENT_DARK }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full rounded-3xl border px-5 py-3 outline-none transition focus:ring-2"
              style={{
                borderColor: ACCENT,
                background: WHITE,
                color: ACCENT_DARK,
                boxShadow: 'none',
                borderWidth: 1,
              }}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: ACCENT_DARK }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full rounded-3xl border px-5 py-3 outline-none transition focus:ring-2"
              style={{
                borderColor: ACCENT,
                background: WHITE,
                color: ACCENT_DARK,
                boxShadow: 'none',
                borderWidth: 1,
              }}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div
              className="rounded-3xl border px-4 py-3 text-sm font-semibold"
              style={{ borderColor: ACCENT, color: ACCENT_DARK, background: SURFACE }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition"
            style={{ background: ACCENT, color: WHITE, border: `1px solid ${ACCENT}` }}
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 rounded-3xl border p-4 text-sm" style={{ borderColor: ACCENT, background: SURFACE }}>
          <p className="mb-2 font-semibold" style={{ color: ACCENT_DARK }}>
            Demo credentials
          </p>
          <p className="font-mono rounded-full px-3 py-2 inline-block" style={{ background: ACCENT, color: WHITE }}>
            admin / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
