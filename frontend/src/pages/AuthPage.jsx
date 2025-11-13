import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Lock, Eye, EyeOff, UserCircle } from 'lucide-react';

export default function AuthPage() {
  const { mode } = useParams(); // 'login' or 'signup'
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState(mode === 'signup' ? 'signup' : 'login');
  const [userType, setUserType] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Update form mode if user manually changes URL
    if (mode === 'signup' || mode === 'login') {
      setAuthMode(mode);
    }
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!email || !password || (authMode === 'signup' && !username)) {
        setError('Please fill all fields');
      } else {
        alert(
          authMode === 'login'
            ? `Logged in successfully as ${userType}`
            : `Signed up successfully as ${userType} (${username})`
        );
        navigate('/'); // redirect after login/signup
      }
      setLoading(false);
    }, 1000);
  };

  const toggleAuthMode = () => {
    const newMode = authMode === 'login' ? 'signup' : 'login';
    navigate(`/auth/${newMode}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 lg:hidden"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 backdrop-blur-md lg:backdrop-blur-none lg:hidden" />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
              <span className="text-3xl font-bold text-white">C</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Courtify
            </h1>
            <p className="text-gray-400">
              {authMode === 'login'
                ? 'Sign in to your account'
                : 'Create your account'}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  userType === 'user'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-gray-300'
                }`}
              >
                <User size={18} />
                <span>User</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  userType === 'admin'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-gray-300'
                }`}
              >
                <Building2 size={18} />
                <span>Court Admin</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <UserCircle
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={20}
                    />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder-gray-500"
                      placeholder="johndoe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-11 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder-gray-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Please wait...'
                  : authMode === 'login'
                  ? 'Sign In'
                  : 'Sign Up'}
              </button>
            </form>

            {userType === 'user' && (
              <div className="mt-6 text-center">
                <button
                  onClick={toggleAuthMode}
                  className="text-sm text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {authMode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <span className="font-semibold text-white">Sign up</span>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <span className="font-semibold text-white">Sign in</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-blue-800/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-lg">
            <h2 className="text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
              Book Your Court,<br />Play Your Game
            </h2>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Join thousands of players and court owners using Courtify to
              streamline bookings and elevate the game.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
